"""Aperçu compact d'un brouillon : structure + début de chaque paragraphe (numérotés)."""
import re
import sys
for i, l in enumerate(open(sys.argv[1]), 1):
    t = l.strip()
    if t.startswith(('page:', 'repere:', "type:", 'niveau:', '/*')) or t.startswith('<p>') or t.startswith('<li>') or t.startswith('<ul'):
        if t.startswith(('<p>', '<li>')):
            t = re.sub(r'<[^>]+>', '', t)
            t = '    ' + t[:int(sys.argv[2]) if len(sys.argv) > 2 else 110]
        print('%4d %s' % (i, t))
