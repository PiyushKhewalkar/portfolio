import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import hljs from 'highlight.js'

const root = process.cwd()
const postsDir = path.join(root, 'content', 'blog')
const outDir = path.join(root, 'public', 'blog')

marked.setOptions({
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  }
})

fs.mkdirSync(outDir, { recursive: true })
fs.mkdirSync(postsDir, { recursive: true })

const template = ({ title, description, date, content, slug, author }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} — Piyush Khewalkar</title>
    <meta name="description" content="${description}" />
    <meta name="author" content="${author || 'Piyush Khewalkar'}" />
    <link rel="icon" type="image/svg+xml" href="/code.svg" />
    <link rel="canonical" href="/blog/${slug}/" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title} — Piyush Khewalkar" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="/blog/${slug}/" />
    <meta property="og:image" content="/og.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title} — Piyush Khewalkar" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="/og.png" />
    <link rel="stylesheet" href="/site.css" />
    <link rel="stylesheet" href="/blog.css" />
  </head>
  <body>
    <main class="container">
      <header style="margin-bottom:16px">
        <a href="/" class="mono underline-hover muted">//home</a>
      </header>
      <article class="post">
        <h1 class="mono" style="font-size:28px; margin-bottom:8px">${title}</h1>
        <p class="muted mono" style="margin-top:0">${new Date(date).toDateString()}</p>
        <div class="divider"></div>
        <section class="content">${content}</section>
      </article>
    </main>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/github-dark.min.css" />
    <link rel="stylesheet" href="/site.css" />
    <script type="application/ld+json">
      ${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        datePublished: date,
        author: { '@type': 'Person', name: author || 'Piyush Khewalkar' },
        mainEntityOfPage: `/blog/${slug}/`
      })}
    </script>
  </body>
</html>`

function toSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

let files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx')) : []

// create a starter post if none exists so the blog always builds
if (files.length === 0) {
  const starter = `---\n` +
  `title: hello, world\n` +
  `description: first post from generator\n` +
  `date: ${new Date().toISOString()}\n` +
  `---\n\n` +
  `this is a starter post.\n\n` +
  '```js\nconsole.log("hello blog")\n```\n'
  fs.writeFileSync(path.join(postsDir, 'hello-world.md'), starter)
  files = ['hello-world.md']
}

const index = []
for (const file of files) {
  const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
  const { data, content } = matter(raw)
  const html = marked.parse(content)
  const slug = data.slug || toSlug(data.title || file.replace(/\.(md|mdx)$/, ''))
  const postDir = path.join(outDir, slug)
  fs.mkdirSync(postDir, { recursive: true })
  const outPath = path.join(postDir, 'index.html')
  fs.writeFileSync(outPath, template({
    title: data.title || slug,
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    author: data.author || 'Piyush Khewalkar',
    content: html,
    slug
  }))
  index.push({
    title: data.title || slug,
    slug,
    description: data.description || '',
    date: data.date || new Date().toISOString()
  })
}

// write index json and html listing
fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index, null, 2))

const list = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>blog — Piyush Khewalkar</title>
    <meta name="description" content="posts by Piyush Khewalkar" />
    <link rel="icon" type="image/svg+xml" href="/code.svg" />
    <link rel="stylesheet" href="/site.css" />
    <link rel="stylesheet" href="/blog.css" />
  </head>
  <body>
    <main class="container">
      <header class="between mono" style="font-size:14px; margin-bottom:12px">
        <a href="/" class="underline-hover muted">//home</a>
        <span class="muted">//blog</span>
      </header>
      <div class="divider"></div>
      <section class="col" style="gap:12px">
        <input class="search" id="q" placeholder="//search posts" />
        <div id="list" class="col" style="gap:12px">
          ${index.map(p => `
            <div class=\"item\">
              <div class=\"two-col\">
                <div class=\"muted mono\">${new Date(p.date).toDateString()}</div>
                <div class=\"col\">
                  <a class=\"underline-hover title\" href=\"/blog/${p.slug}/\">${p.title}</a>
                  <p class=\"muted\">${p.description}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </main>
    <script>
      const posts = ${JSON.stringify(index)}
      const list = document.getElementById('list')
      const q = document.getElementById('q')
      function render(items){
        list.innerHTML = items.map(function(p){
          var d = new Date(p.date).toDateString();
          return '<div class="two-col item">\n'
            + '  <div class="muted mono">' + d + '</div>\n'
            + '  <div class="col">\n'
            + '    <a class="underline-hover title" href="/blog/' + p.slug + '/">' + p.title + '</a>\n'
            + '    <p class="muted">' + (p.description || '') + '</p>\n'
            + '  </div>\n'
            + '</div>'
        }).join('')
      }
      function filter(){
        const term = q.value.toLowerCase()
        const out = posts.filter(p => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term))
        render(out)
      }
      q.addEventListener('input', filter)
      render(posts)
    </script>
  </body>
</html>`

fs.writeFileSync(path.join(outDir, 'index.html'), list)

console.log(`Generated ${index.length} blog post(s) → /public/blog/*.html and index.html`)

