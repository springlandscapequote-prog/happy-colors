#!/usr/bin/env python3
"""Collect "Suggest a picture" ideas from the free ntfy.sh topic named in config.js (SUGGEST_URL).

Run at least every 6 hours (ntfy keeps messages only ~12 hours):
    python3 tools/pull_suggestions.py          # prints the NEW rows as JSON and writes suggestions-new.json

What it does
  * polls https://ntfy.sh/<topic>/json?poll=1&since=all
  * skips messages already seen (ntfy message id kept in suggestions-seen.json, NOT in git)
  * ignores messages that are not valid items, and test messages (body contains the word TEST)
  * cleans the text: removes anything that looks like a URL, email or phone number, control chars,
    leading = + - @ (spreadsheet formulas), max 200 chars
  * writes the new rows  [when_pacific, category_label, idea]  to suggestions-new.json (overwritten each run)
  * appends every collected row to suggestions-all.csv (local backup)
It never touches the Google Sheet: the main agent appends the rows from suggestions-new.json with the Sheets connector.
Files live in DATA_DIR (default: the folder above this script's repo, i.e. /workspace/happy-colors), outside git.
Override with env HC_DATA_DIR. Exit codes: 0 ok, 2 could not reach ntfy (nothing marked seen).
"""
import csv, json, os, re, sys, urllib.request
from datetime import datetime
from zoneinfo import ZoneInfo

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
DATA = os.environ.get('HC_DATA_DIR') or ('/workspace/happy-colors' if os.path.isdir('/workspace/happy-colors') else os.path.dirname(REPO))
SEEN, NEW, ALL = (os.path.join(DATA, n) for n in ('suggestions-seen.json', 'suggestions-new.json', 'suggestions-all.csv'))
LABELS = {'animals': 'Animals', 'nature': 'Nature', 'vehicles': 'Vehicles', 'holidays': 'Holidays', 'fantasy': 'Fantasy', 'space': 'Space', 'other': 'Something else'}
PT = ZoneInfo('America/Los_Angeles')

def topic_url():
    cfg = open(os.path.join(REPO, 'config.js'), encoding='utf-8').read()
    m = re.search(r"SUGGEST_URL\s*=\s*'(https://ntfy\.sh/[A-Za-z0-9_-]+)'", cfg)
    if not m: sys.exit('SUGGEST_URL in config.js is not an ntfy.sh topic')
    return m.group(1)

def clean(t):
    t = re.sub(r'[\x00-\x1f\x7f]', ' ', str(t or ''))
    t = re.sub(r'(?i)\b(?:https?://|www\.)\S+', ' ', t)
    t = re.sub(r'(?i)\b[\w.+-]+\s*(?:@|\(at\))\s*[\w-]+(?:\.[\w-]+)+', ' ', t)
    t = re.sub(r'(?i)\b[\w-]+\.(?:com|net|org|io|co|us|edu|gov|info|me|app|xyz)\b\S*', ' ', t)
    t = re.sub(r'\+?\d[\d\s().-]{5,}\d', ' ', t)           # phone-like: 7+ digits with separators
    t = re.sub(r'\d{5,}', ' ', t)                           # long digit runs
    t = re.sub(r'\s+', ' ', t).strip()
    t = re.sub(r'^[=+\-@\s]+', '', t)                       # no spreadsheet formulas
    return t[:200].strip()

def pacific(item_when, ntfy_time):
    base = datetime.fromtimestamp(ntfy_time, PT)
    try:
        d = datetime.fromisoformat(str(item_when).replace('Z', '+00:00'))
        if d.tzinfo is None: raise ValueError
        d = d.astimezone(PT)
        if abs((d - base).total_seconds()) < 86400: base = d   # trust the phone clock only if sane
    except Exception:
        pass
    return base.strftime('%Y-%m-%d %H:%M')

def main():
    url = topic_url() + '/json?poll=1&since=all'
    try:
        raw = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'happy-colors-collector'}), timeout=30).read().decode('utf-8', 'replace')
    except Exception as e:
        print('ERROR: could not reach ntfy: %s' % e, file=sys.stderr); return 2
    try: seen = set(json.load(open(SEEN)))
    except Exception: seen = set()
    msgs = []
    for ln in raw.splitlines():
        try: m = json.loads(ln)
        except Exception: continue
        if m.get('event') == 'message': msgs.append(m)
    msgs.sort(key=lambda m: m.get('time', 0))
    rows, skipped = [], {'seen': 0, 'test': 0, 'invalid': 0}
    for m in msgs:
        mid = m.get('id')
        if not mid or mid in seen: skipped['seen'] += 1; continue
        seen.add(mid)
        body = m.get('message') or ''
        if 'TEST' in body or 'TEST' in (m.get('title') or ''): skipped['test'] += 1; continue
        try:
            it = json.loads(body)
            assert isinstance(it, dict)
            cat, txt = it.get('category', ''), it.get('text', '')
            assert isinstance(cat, str) and isinstance(txt, str)
        except Exception:
            skipped['invalid'] += 1; continue
        label = LABELS.get(cat) or ('(not picked)' if not cat else 'Something else')
        idea = clean(txt) or '(no idea typed)'
        if label == '(not picked)' and idea == '(no idea typed)': skipped['invalid'] += 1; continue
        rows.append([pacific(it.get('when'), m.get('time', 0)), label, idea])
    if rows:
        new = not os.path.exists(ALL)
        with open(ALL, 'a', newline='', encoding='utf-8') as f:
            w = csv.writer(f)
            if new: w.writerow(['When (Pacific)', 'Category', 'Idea'])
            w.writerows(rows)
    json.dump(rows, open(NEW, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    json.dump(sorted(seen), open(SEEN, 'w'))
    print(json.dumps(rows, ensure_ascii=False))
    print('new=%d skipped=%s -> %s' % (len(rows), skipped, NEW), file=sys.stderr)
    return 0

if __name__ == '__main__': sys.exit(main())
