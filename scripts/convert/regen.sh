#!/bin/sh
# Régénère les brouillons du tome 1.
cd "$(dirname "$0")" && python3 - <<'PY'
import sys, json, importlib
sys.path.insert(0,'.')
from t1_files import D, CHAPITRES
import gen
for n,f in CHAPITRES:
    importlib.reload(gen)
    h,mc,ar = gen.convert(D+f)
    open('out/drafts1/ch%02d.jsx'%n,'w').write('\n'.join(gen.render(h,mc,ar))+'\n// RAPPORT : '+json.dumps(gen.report,ensure_ascii=False)+'\n')
PY
