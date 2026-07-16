const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'blog', 'posts');
const postsJson = path.join(postsDir, 'posts.json');

const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));

const posts = files.map(filename => {
  const content = fs.readFileSync(path.join(postsDir, filename), 'utf-8');
  const frontmatter = {};
  let body = content;

  if (content.startsWith('---')) {
    const end = content.indexOf('---', 3);
    if (end !== -1) {
      const fm = content.slice(3, end).trim();
      fm.split('\n').forEach(line => {
        const colon = line.indexOf(':');
        if (colon > 0) {
          const key = line.slice(0, colon).trim();
          const val = line.slice(colon + 1).trim();
          frontmatter[key] = val;
        }
      });
      body = content.slice(end + 3).trim();
    }
  }

  return {
    slug: filename.replace(/\.md$/, ''),
    title: frontmatter.title || filename,
    date: frontmatter.date || '',
    author: frontmatter.author || '',
    excerpt: frontmatter.excerpt || body.slice(0, 200).replace(/\n/g, ' ') + '...'
  };
});

posts.sort((a, b) => new Date(b.date) - new Date(a.date));

fs.writeFileSync(postsJson, JSON.stringify(posts, null, 2));
console.log('Generated posts.json with', posts.length, 'posts');
