import re
import os
d=os.path.dirname(os.path.abspath(__file__))
s=open(os.path.join(d,'src.html')).read()
# Designed confluence catalogs (cards/catalog_<el>.js) load after the specials, each wrapped so its cards replace that
# confluence's older basics (see catalogBegin in src.html); the Forge (cards/forge.js) then picks from them.
cd=os.path.join(d,'cards')
cats=sorted(f for f in os.listdir(cd) if re.fullmatch(r'catalog_[a-z]+\.js', f))
catparts=['catalogBegin("%s");\n' % f[8:-3] + open(os.path.join(cd,f)).read() + '\ncatalogEnd("%s");' % f[8:-3] for f in cats]
order=['dsl.js','value.js','fire.js','water.js','earth.js','wind.js','lightning.js','fusion.js','forge.js','confluences.js','specials_dual.js','specials_triple.js']
parts=[open(os.path.join(cd,f)).read() for f in order]+catparts+[open(os.path.join(cd,f)).read() for f in ['manifests_more.js','decks.js','decks_conf.js','decks_triple.js','decks_catalog.js','catalog.js','winrates.js']]
assert s.count('/*__CARDS__*/')==1
s=s.replace('/*__ART__*/', open(os.path.join(d,'art.js')).read())
# RPG layer: engine and maps, then Balance's encounter tables, then Story's words (story/data/*.js override placeholders).
assert s.count('/*__RPG__*/')==1
rpg=[open(os.path.join(d,'rpg',f)).read() for f in ['encounters.js','rosters.js','maps.js','worldgen.js','regions.js','quests.js','world.js','story.js','explore.js']]
sd=os.path.join(d,'story','data')
if os.path.isdir(sd): rpg+= [open(os.path.join(sd,f)).read() for f in sorted(os.listdir(sd)) if f.endswith('.js')]
s=s.replace('/*__RPG__*/','\n'.join(rpg))
# Music (owner: Music): its own script block before the game script, so tools/mk.sh never pulls it into the headless engine.
import json
md=os.path.join(d,'music')
mus=[open(os.path.join(md,f)).read() for f in ['palette.js','synth.js']+[f for f in json.load(open(os.path.join(md,'tracks','order.json'))) if f not in ('palette.js','synth.js')]+['levels.js','player.js']]
assert s.count('/*__MUSIC__*/')==1 and not any('</script' in m for m in mus)
s=s.replace('/*__MUSIC__*/','\n'.join(mus))
open(os.path.join(d,'index.html'),'w').write(s.replace('/*__CARDS__*/','\n'.join(parts)))
print("built", len(s))
