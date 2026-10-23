import os
d=os.path.dirname(os.path.abspath(__file__))
s=open(os.path.join(d,'src.html')).read()
parts=[open(os.path.join(d,'cards',f)).read() for f in ['dsl.js','value.js','fire.js','water.js','earth.js','wind.js','lightning.js','fusion.js','confluences.js','specials_dual.js','specials_triple.js','manifests_more.js','decks.js','decks_conf.js','decks_triple.js','catalog.js','winrates.js']]
assert s.count('/*__CARDS__*/')==1
s=s.replace('/*__ART__*/', open(os.path.join(d,'art.js')).read())
# RPG layer: engine and maps, then Balance's encounter tables, then Story's words (story/data/*.js override placeholders).
assert s.count('/*__RPG__*/')==1
rpg=[open(os.path.join(d,'rpg',f)).read() for f in ['encounters.js','maps.js','world.js']]
sd=os.path.join(d,'story','data')
if os.path.isdir(sd): rpg+= [open(os.path.join(sd,f)).read() for f in sorted(os.listdir(sd)) if f.endswith('.js')]
s=s.replace('/*__RPG__*/','\n'.join(rpg))
open(os.path.join(d,'index.html'),'w').write(s.replace('/*__CARDS__*/','\n'.join(parts)))
print("built", len(s))
