#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const CONTENT_DIR = 'content/blog';

function generateBlog() {
  console.log('🔄 Regenerating blog...');
  const child = spawn('node', ['scripts/generate-blog.mjs'], {
    stdio: 'inherit'
  });
  
  child.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Blog regenerated successfully');
    } else {
      console.log('❌ Blog regeneration failed');
    }
  });
}

function startWatching() {
  console.log('👀 Watching for blog changes...');
  
  // Generate initial blog
  generateBlog();
  
  // Watch for changes if content directory exists
  if (fs.existsSync(CONTENT_DIR)) {
    fs.watch(CONTENT_DIR, { recursive: true }, (eventType, filename) => {
      if (filename && filename.endsWith('.md')) {
        console.log(`📝 Content changed: ${filename}`);
        generateBlog();
      }
    });
    console.log(`🎯 Watching ${CONTENT_DIR} for changes...`);
  } else {
    console.log(`📁 Content directory ${CONTENT_DIR} doesn't exist yet. Will generate empty blog.`);
  }
  
  // Keep the process running
  process.on('SIGINT', () => {
    console.log('\n👋 Blog watcher stopped');
    process.exit(0);
  });
  
  // Keep alive
  setInterval(() => {}, 1000);
}

startWatching();