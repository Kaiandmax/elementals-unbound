require("./engine.js"); const S=globalThis.__sim; const fs=require("fs");
const T10=Object.values(S.DECK_BY_ID).filter(d=>d.tier==="rare" && S.TRIPLE_ELS.includes(d.el)).map(d=>d.id);
const ST=Object.values(S.DECK_BY_ID).filter(d=>d.tier===process.env.LOWT && !d.conf).map(d=>d.id); const PART=+process.env.PART; const res={};
const play = async (a, b, seat) => { const r = await S.newGame(seat?b:a, seat?a:b, 15, [5,5]); const win = r==="you"?0:r==="enemy"?1:-1; return win===seat ? 1 : win===-1 ? 0.5 : 0; };
(async()=>{ let k=0; for (const a of T10) for (const b of ST){ k++; if (k%2!==PART) continue; let w=0; for (let s=0;s<2;s++) w+=await play(a,b,s); res[a+"|"+b]=w; fs.writeFileSync(process.env.OUT, JSON.stringify(res)); } })();
