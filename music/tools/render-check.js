// Offline render check for every track, in both finishes, in headless Chromium (OfflineAudioContext).
// Reports length, peak, loudness (RMS), the loop seam (does the jump from the last bar back to the first click or
// drop out, compared with the track's other bar lines) and, for layered tracks, loudness at intensity 0.
//   node music/tools/render-check.js            check (exit 1 on clipping, a bad seam, NaN or a tail that won't end)
//   node music/tools/render-check.js --levels   measure and write music/levels.js (loudness trims), then check
//   add --only id1,id2 to limit tracks, --wav DIR to save WAVs.  Needs Playwright (NODE_PATH=$(npm root -g)).
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const root = path.join(__dirname, ".."), argv = process.argv.slice(2);
const arg = (k) => { const i = argv.indexOf(k); return i < 0 ? null : argv[i + 1]; };
const ORDER = JSON.parse(fs.readFileSync(path.join(root, "tracks", "order.json"), "utf8"));
const TARGET = -16, PEAK_MAX = -1.5; // dBFS

async function measure(levels, only, wavDir, quick) {
  const browser = await chromium.launch();
  const ids = await (async () => { const p = await browser.newPage(); await load(p, levels);
    const r = await p.evaluate(() => EU_TRACKS.map((t) => t.id)); await p.close(); return r; })();
  const todo = []; for (const id of ids) if (!only || only.includes(id)) for (const f of ["enhanced", "chip"]) todo.push([id, f]);
  const out = [], N = 3;
  await Promise.all([...Array(N)].map(async () => {
    const p = await browser.newPage(); await load(p, levels);
    while (todo.length) { const [id, finish] = todo.shift(); out.push(await p.evaluate(renderOne, { id, finish, wav: !!wavDir, quick: !!quick })); }
    await p.close();
  }));
  await browser.close();
  if (wavDir) { fs.mkdirSync(wavDir, { recursive: true }); for (const r of out) if (r.wav) { fs.writeFileSync(path.join(wavDir, `${r.finish}-${r.id}.wav`), Buffer.from(r.wav, "base64")); delete r.wav; } }
  return ids.flatMap((id) => out.filter((r) => r.id === id));
}
async function load(page, levels) {
  await page.setContent("<html><body></body></html>");
  for (const f of ORDER) await page.addScriptTag({ content: fs.readFileSync(path.join(root, f), "utf8") });
  await page.addScriptTag({ content: "window.EU_LEVELS = " + JSON.stringify(levels) + ";" });
}

// runs in the page
async function renderOne({ id, finish, wav, quick }) {
  const C = EUSynth.compile(EU_TRACKS.find((t) => t.id === id)), sr = 44100, bar = C.meter * C.spb;
  const db = (v) => 20 * Math.log10(v || 1e-9);
  async function go(intensity, loops, extra) {
    const len = (C.once || loops === 1 ? C.seconds : C.seconds * (loops - 1) + bar * 2) + extra;
    const ctx = new OfflineAudioContext(2, Math.ceil(len * sr), sr);
    EUSynth.render(ctx, ctx.destination, C, 0, { finish, loops, intensity });
    return ctx.startRendering();
  }
  const buf = await go(1, quick ? 1 : 2, C.once ? 3 : quick ? 0 : 1), L = buf.getChannelData(0), R = buf.getChannelData(1);
  const body = Math.floor((C.once ? C.seconds : C.seconds) * sr);
  let peak = 0, s2 = 0, nan = 0;
  for (let i = 0; i < L.length; i++) { const a = L[i], b = R[i]; if (!isFinite(a) || !isFinite(b)) { nan++; continue; }
    peak = Math.max(peak, Math.abs(a), Math.abs(b)); if (i < body) s2 += a * a + b * b; }
  const row = { id, finish, seconds: +C.seconds.toFixed(1), peak: +db(peak).toFixed(1), rms: +db(Math.sqrt(s2 / (2 * body))).toFixed(1), nan };
  const win = (i0, n) => { let m = 0, s = 0; for (let i = Math.max(1, i0); i < Math.min(L.length, i0 + n); i++) { m = Math.max(m, Math.abs(L[i] - L[i - 1])); s += L[i] * L[i]; } return { jump: m, rms: Math.sqrt(s / n) }; };
  if (quick) return row;
  if (!C.once) { // seam vs the other bar lines
    const w = Math.floor(.005 * sr), r = Math.floor(.1 * sr), others = [];
    for (let b = 1; b < C.nBars; b++) { const i = Math.floor(b * bar * sr); others.push(win(i - w, 2 * w).jump / Math.max(1e-6, win(i, r).rms)); }
    const si = Math.floor(C.seconds * sr), seam = win(si - w, 2 * w).jump / Math.max(1e-6, win(si, r).rms);
    others.sort((a, b) => a - b); const med = others[others.length >> 1] || 1;
    const after = db(win(si, r).rms), typical = db(Math.sqrt(others.length ? [...Array(C.nBars - 1)].map((_, k) => win(Math.floor((k + 1) * bar * sr), r).rms ** 2).reduce((a, b) => a + b) / (C.nBars - 1) : 1e-9));
    row.seam = +(seam / med).toFixed(2); row.seamDrop = +(typical - after).toFixed(1);
  } else { let tp = 0; for (let i = L.length - 2205; i < L.length; i++) tp = Math.max(tp, Math.abs(L[i])); row.tail = +db(tp).toFixed(1); }
  if (C.layered) { const b0 = await go(0, 1, 0), d = b0.getChannelData(0); let s = 0; const n = Math.floor(C.seconds * sr);
    for (let i = 0; i < n; i++) s += d[i] * d[i]; row.rms0 = +db(Math.sqrt(s / n)).toFixed(1); }
  if (wav) { const N = L.length, ab = new ArrayBuffer(44 + N * 4), v = new DataView(ab), ws = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
    ws(0, "RIFF"); v.setUint32(4, 36 + N * 4, true); ws(8, "WAVEfmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 2, true);
    v.setUint32(24, sr, true); v.setUint32(28, sr * 4, true); v.setUint16(32, 4, true); v.setUint16(34, 16, true); ws(36, "data"); v.setUint32(40, N * 4, true);
    for (let i = 0; i < N; i++) { v.setInt16(44 + i * 4, Math.max(-1, Math.min(1, L[i])) * 32767, true); v.setInt16(46 + i * 4, Math.max(-1, Math.min(1, R[i])) * 32767, true); }
    let s = ""; const u = new Uint8Array(ab); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); row.wav = btoa(s); }
  return row;
}

(async () => {
  const only = arg("--only") ? arg("--only").split(",") : null, wavDir = arg("--wav"), lvPath = path.join(root, "levels.js");
  let levels = {};
  try { levels = JSON.parse(fs.readFileSync(lvPath, "utf8").replace(/^[^{]*/, "").replace(/;\s*$/, "")); } catch (e) {}
  if (argv.includes("--levels")) {
    for (let pass = 0; pass < 2; pass++) { // two passes: the compressor makes gain changes slightly non-linear
      const rows = await measure(levels, only, null, true);
      for (const r of rows) { const cur = (levels[r.id] || {})[r.finish] || 0;
        let trim = cur + (TARGET - r.rms); trim = Math.min(trim, cur + (PEAK_MAX - r.peak));
        (levels[r.id] = levels[r.id] || {})[r.finish] = +trim.toFixed(1); }
    }
    fs.writeFileSync(lvPath, "/* Generated by music/tools/render-check.js --levels: loudness trims in dB per track and finish,\n   so every track plays near " + TARGET + " dBFS RMS without clipping. Don't edit by hand. */\nwindow.EU_LEVELS = " +
      JSON.stringify(levels, null, 0).replace(/\},"/g, '},\n  "').replace(/^\{/, "{\n  ").replace(/\}$/, "\n}") + ";\n");
    console.log("wrote music/levels.js");
  }
  const rows = await measure(levels, only, wavDir);
  let bad = 0;
  console.log("finish    track               len    peak    rms   seam  drop   rms@0   tail  flags");
  for (const r of rows) {
    const f = [];
    if (r.peak > -1) f.push("CLIPPING"); if (r.nan) f.push("NaN");
    if (r.seam != null && (r.seam > 3 || r.seamDrop > 15)) f.push("SEAM");
    if (r.tail != null && r.tail > -60) f.push("TAIL");
    if (f.length) bad++;
    const p = (v, n) => String(v == null ? "" : v).padStart(n);
    console.log(`${r.finish.padEnd(9)} ${r.id.padEnd(18)} ${p(r.seconds, 5)}s ${p(r.peak, 6)} ${p(r.rms, 6)} ${p(r.seam, 6)} ${p(r.seamDrop, 5)} ${p(r.rms0, 7)} ${p(r.tail, 6)}  ${f.join(" ") || "ok"}`);
  }
  const rms = rows.map((r) => r.rms); console.log(`${rows.length} renders, RMS ${Math.min(...rms)} to ${Math.max(...rms)} dBFS, ${bad} flagged`);
  process.exit(bad ? 1 : 0);
})();
