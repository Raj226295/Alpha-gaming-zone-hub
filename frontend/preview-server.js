import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT ?? 4173)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
}

function resolveFile(urlPath) {
  const safePath = decodeURIComponent(urlPath.split('?')[0])
  const requestPath = safePath === '/' ? '/index.html' : safePath
  const fullPath = path.join(distDir, requestPath)

  if (existsSync(fullPath) && statSync(fullPath).isFile()) {
    return fullPath
  }

  return path.join(distDir, 'index.html')
}

createServer((request, response) => {
  const filePath = resolveFile(request.url ?? '/')
  const extension = path.extname(filePath)
  const contentType = mimeTypes[extension] ?? 'application/octet-stream'

  response.writeHead(200, { 'Content-Type': contentType })
  createReadStream(filePath).pipe(response)
}).listen(port, () => {
  console.log(`Frontend preview running on http://127.0.0.1:${port}`)
})
