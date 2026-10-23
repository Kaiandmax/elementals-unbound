globalThis.EF_OVR = JSON.parse(process.env.EF||"{}"); require("./engine.js"); const S=globalThis.__sim; const d=S.DECK_BY_ID[process.env.D];
const tot=c=>Object.values(c.mcost).reduce((a,b)=>a+b,0);
console.log(JSON.stringify([...d.main.map(i=>{const c=S.LIB[i]; return c.name+" "+c.cost+" "+(c.type==="creature"?c.atk+"/"+c.hp:"")+" "+(c.text||"").slice(0,70);}), ...d.manifests.map(i=>{const c=S.LIB[i]; return "M "+c.name+" "+tot(c)+" "+(c.type==="creature"?c.atk+"/"+c.hp:"")+" "+(c.text||"").slice(0,70);})]));
