import { createServer } from 'node:http'
import { routeRequest } from './routes/router.js'
import { sendJson } from './utils/response.js'

const port = Number(process.env.PORT ?? 4000)

const server = createServer(async (request, response) => {
  try {
    const chunks = []

    for await (const chunk of request) {
      chunks.push(chunk)
    }

    const rawBody = Buffer.concat(chunks).toString()
    const body = rawBody ? JSON.parse(rawBody) : {}

    routeRequest(request, response, body)
  } catch (error) {
    sendJson(response, 500, {
      message: 'Unexpected server error',
      detail: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

server.listen(port, () => {
  console.log(`Alpha Game Zone API running on http://localhost:${port}`)
})
