import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

const root = process.cwd()
const dir = path.join(root, 'content', 'blog')

let building = false
let pending = false

function build() {
  if (building) { pending = true; return }
  building = true
  const proc = spawn(process.execPath, [path.join(root, 'scripts', 'generate-blog.mjs')], { stdio: 'inherit' })
  proc.on('exit', () => {
    building = false
    if (pending) { pending = false; build() }
  })
}

fs.mkdirSync(dir, { recursive: true })
build()

try {
  fs.watch(dir, { recursive: true }, () => {
    build()
  })
  console.log('Watching for blog changes in content/blog ...')
} catch (e) {
  console.log('Recursive watch not supported; polling every 2s')
  setInterval(() => build(), 2000)
}

