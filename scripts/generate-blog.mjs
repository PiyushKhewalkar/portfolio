#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const CONTENT_DIR = 'content/blog';
const OUTPUT_DIR = 'public/blog';

function generateBlog() {
  console.log('🚀 Generating blog...');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Check if content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('📝 No content directory found. Creating basic structure...');
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    
    // Create a basic index.json for the blog
    const blogIndex = {
      posts: [],
      generated: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'index.json'), 
      JSON.stringify(blogIndex, null, 2)
    );
    
    console.log('✅ Blog generation complete (empty)');
    return;
  }
  
  // Generate blog posts (basic implementation)
  const posts = [];
  const files = fs.readdirSync(CONTENT_DIR);
  
  for (const file of files) {
    if (file.endsWith('.md')) {
      const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
      const slug = file.replace('.md', '');
      
      // Basic markdown to HTML conversion (placeholder)
      const html = `<!DOCTYPE html>
<html>
<head>
  <title>${slug}</title>
  <link rel="stylesheet" href="../blog.css">
</head>
<body>
  <div class="container">
    <pre>${content}</pre>
  </div>
</body>
</html>`;
      
      fs.writeFileSync(path.join(OUTPUT_DIR, `${slug}.html`), html);
      
      posts.push({
        slug,
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        file: `${slug}.html`
      });
    }
  }
  
  // Create blog index
  const blogIndex = {
    posts,
    generated: new Date().toISOString()
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'index.json'), 
    JSON.stringify(blogIndex, null, 2)
  );
  
  console.log(`✅ Generated ${posts.length} blog posts`);
}

generateBlog();