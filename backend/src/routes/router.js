import {
  createBookingQuote,
  getAdminDashboard,
  getBookingOptions,
  getHealth,
  getHomepage,
  getTournaments,
  getUserDashboard,
  registerTournament,
} from '../controllers/apiController.js'
import { sendJson } from '../utils/response.js'

export function routeRequest(request, response, body) {
  const { method, url } = request

  if (method === 'OPTIONS') {
    return sendJson(response, 204, {})
  }

  if (method === 'GET' && url === '/api/health') {
    const result = getHealth()
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'GET' && url === '/api/homepage') {
    const result = getHomepage()
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'GET' && url === '/api/bookings/options') {
    const result = getBookingOptions()
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'POST' && url === '/api/bookings/quote') {
    const result = createBookingQuote(body)
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'GET' && url === '/api/tournaments') {
    const result = getTournaments()
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'POST' && url === '/api/tournaments/register') {
    const result = registerTournament(body)
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'GET' && url === '/api/dashboard/user') {
    const result = getUserDashboard()
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'GET' && url === '/api/dashboard/admin') {
    const result = getAdminDashboard()
    return sendJson(response, result.statusCode, result.payload)
  }

  return sendJson(response, 404, {
    message: 'Route not found',
    path: url,
  })
}
