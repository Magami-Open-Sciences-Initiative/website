import os
import json
import re

BASE = os.path.dirname(__file__)

def parse_frontmatter(content):
    frontmatter = {}
    body = content
    if content.startswith('---'):
        match = re.search(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
        if match:
            lines = match.group(1).strip().split('\n')
            current_key = None
            current_list = None
            for line in lines:
                colon = line.find(':')
                if colon > 0 and not line.startswith(' '):
                    if current_key and current_list is not None:
                        frontmatter[current_key] = current_list
                        current_list = None
                    current_key = line[:colon].strip()
                    val = line[colon+1:].strip()
                    current_list = None
                    if val:
                        val = val.strip('"').strip("'")
                        if val.startswith('[') and val.endswith(']'):
                            try:
                                val = json.loads(val.replace("'", '"'))
                            except:
                                val = [v.strip().strip('"').strip("'") for v in val[1:-1].split(',')]
                        frontmatter[current_key] = val
                        current_key = None
                    else:
                        current_list = []
                elif line.startswith('  - ') and current_list is not None:
                    current_list.append(line.strip('- ').strip())
            if current_key and current_list is not None:
                frontmatter[current_key] = current_list
            body = content[match.end():].strip()
    return frontmatter, body

def get_field(fm, key, default=''):
    val = fm.get(key, default)
    if isinstance(val, list):
        return val
    return val

# Build blog posts
posts_dir = os.path.join(BASE, '..', 'blog', 'posts')
posts_json = os.path.join(posts_dir, 'posts.json')
posts = []
for f in sorted(os.listdir(posts_dir)):
    if not f.endswith('.md'):
        continue
    filepath = os.path.join(posts_dir, f)
    with open(filepath, 'r', encoding='utf-8') as fh:
        content = fh.read()
    fm, body = parse_frontmatter(content)
    posts.append({
        'slug': f.replace('.md', ''),
        'title': fm.get('title', f),
        'date': fm.get('date', ''),
        'author': fm.get('author', ''),
        'excerpt': fm.get('excerpt', body[:200].replace('\n', ' ') + '...')
    })
posts.sort(key=lambda p: p['date'], reverse=True)
with open(posts_json, 'w', encoding='utf-8') as fh:
    json.dump(posts, fh, indent=2)
print(f'Generated posts.json with {len(posts)} posts')

# Build publications
pubs_dir = os.path.join(BASE, '..', 'publications', 'papers')
pubs_json = os.path.join(pubs_dir, 'papers.json')
pubs = []
for f in sorted(os.listdir(pubs_dir)):
    if not f.endswith('.md'):
        continue
    filepath = os.path.join(pubs_dir, f)
    with open(filepath, 'r', encoding='utf-8') as fh:
        content = fh.read()
    fm, body = parse_frontmatter(content)
    pubs.append({
        'slug': f.replace('.md', ''),
        'title': fm.get('title', f),
        'authors': fm.get('authors', ''),
        'journal': fm.get('journal', ''),
        'year': fm.get('year', ''),
        'doi': fm.get('doi', ''),
        'type': fm.get('type', 'journal'),
        'tags': fm.get('tags', []),
        'excerpt': fm.get('excerpt', body[:200].replace('\n', ' ') + '...'),
        'abstract': body[:500]
    })
pubs.sort(key=lambda p: p.get('year', ''), reverse=True)
with open(pubs_json, 'w', encoding='utf-8') as fh:
    json.dump(pubs, fh, indent=2)
print(f'Generated papers.json with {len(pubs)} publications')
