// Offline render check for music sketches: renders each palette entry in headless Chromium
// (OfflineAudioContext) and reports length, peak, loudness and tail level.
// Usage: node music/tools/render-check.js [--wav outDir]
const fs = require("fs"), path = require("path");
const { chromium } = require("playwright");
const root = path.join(__dirname, "..");

(async () => {
  const wavDir = process.argv.includes("--wav") ? process.argv[process.argv.indexOf("--wav") + 1] : null;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent("<html><body></body></html>");
  for (const f of ["palette.js", "synth.js"]) await page.addScriptTag({ content: fs.readFileSync(path.join(root, f), "utf8") });
  const res = await page.evaluate(async (wantWav) => {
    const out = [];
    for (const finish of EUSynth.FINISHES) for (const key of Object.keys(EU_PALETTE.PALETTE)) {
      const sr = 44100, tail = 4;
      const probe = new OfflineAudioContext(2, sr, sr);
      const len = EUSynth.sketch(probe, probe.destination, key, 0, { finish }); // schedule once to learn the length
      const ctx = new OfflineAudioContext(2, Math.ceil((len + tail) * sr), sr);
      EUSynth.sketch(ctx, ctx.destination, key, 0, { finish });
      const buf = await ctx.startRendering();
      let peak = 0, sum = 0, nan = 0, n = 0, bodySum = 0, bodyN = 0;
      for (let c = 0; c < buf.numberOfChannels; c++) { const d = buf.getChannelData(c);
        for (let i = 0; i < d.length; i++) { const x = d[i]; if (!isFinite(x)) { nan++; continue; }
          const a = Math.abs(x); if (a > peak) peak = a; sum += x * x; n++;
          if (i < len * sr) { bodySum += x * x; bodyN++; } } }
      const d0 = buf.getChannelData(0), last = d0.subarray(d0.length - 2205);
      let tailPeak = 0; for (const x of last) tailPeak = Math.max(tailPeak, Math.abs(x));
      const db = (v) => (20 * Math.log10(v || 1e-9)).toFixed(1);
      const row = { key, finish, seconds: +len.toFixed(2), peakDb: db(peak), rmsDb: db(Math.sqrt(bodySum / bodyN)), tailPeakDb: db(tailPeak), nan };
      if (wantWav) { // 16-bit stereo WAV as base64
        const L = buf.getChannelData(0), R = buf.getChannelData(1), N = L.length, ab = new ArrayBuffer(44 + N * 4), v = new DataView(ab);
        const ws = (o, s) => [...s].forEach((ch, i) => v.setUint8(o + i, ch.charCodeAt(0)));
        ws(0, "RIFF"); v.setUint32(4, 36 + N * 4, true); ws(8, "WAVEfmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true);
        v.setUint16(22, 2, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 4, true); v.setUint16(32, 4, true); v.setUint16(34, 16, true);
        ws(36, "data"); v.setUint32(40, N * 4, true);
        for (let i = 0; i < N; i++) { v.setInt16(44 + i * 4, Math.max(-1, Math.min(1, L[i])) * 32767, true); v.setInt16(46 + i * 4, Math.max(-1, Math.min(1, R[i])) * 32767, true); }
        let s = ""; const u = new Uint8Array(ab); for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
        row.wav = btoa(s);
      }
      out.push(row);
    }
    return out;
  }, !!wavDir);
  await browser.close();
  let bad = 0;
  for (const r of res) {
    if (wavDir) { fs.mkdirSync(wavDir, { recursive: true }); fs.writeFileSync(path.join(wavDir, r.finish + "-" + r.key + ".wav"), Buffer.from(r.wav, "base64")); delete r.wav; }
    const flags = [];
    if (+r.peakDb > -1) flags.push("CLIPPING RISK");
    if (+r.tailPeakDb > -60) flags.push("TAIL NOT SILENT");
    if (r.nan) flags.push("NaN SAMPLES");
    if (flags.length) bad++;
    console.log(`${r.finish.padEnd(9)} ${r.key.padEnd(10)} ${String(r.seconds).padStart(6)}s  peak ${r.peakDb.padStart(6)} dBFS  rms ${r.rmsDb.padStart(6)} dBFS  tail ${r.tailPeakDb.padStart(6)} dBFS  ${flags.join(", ") || "ok"}`);
  }
  process.exit(bad ? 1 : 0);
})();
