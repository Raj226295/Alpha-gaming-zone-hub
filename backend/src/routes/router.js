import {
  createBookingQuote,
  getAdminDashboard,
  getBookingOptions,
  getHealth,
  getHomepage,
  getTournamentRegistrations,
  getTournaments,
  getUserDashboard,
  registerTournament,
} from '../controllers/apiController.js'
import { sendJson } from '../utils/response.js'

export function routeRequest(request, response, body) {
  const requestUrl = new URL(request.url, 'http://localhost')
  const { method } = request
  const { pathname, searchParams } = requestUrl

  if (method === 'OPTIONS') {
    return sendJson(response, 204, {})
  }

  if (method === 'GET' && pathname === '/api/health') {
    const result = getHealth()
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'GET' && pathname === '/api/homepage') {
    const result = getHomepage()
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'GET' && pathname === '/api/bookings/options') {
    const result = getBookingOptions()
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'POST' && pathname === '/api/bookings/quote') {
    const result = createBookingQuote(body)
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'GET' && pathname === '/api/tournaments') {
    const result = getTournaments()
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'GET' && pathname === '/api/tournaments/registrations') {
    const result = getTournamentRegistrations(searchParams.get('userId') ?? '')
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'POST' && pathname === '/api/tournaments/register') {
    const result = registerTournament(body)
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'GET' && pathname === '/api/dashboard/user') {
    const result = getUserDashboard()
    return sendJson(response, result.statusCode, result.payload)
  }

  if (method === 'GET' && pathname === '/api/dashboard/admin') {
    const result = getAdminDashboard()
    return sendJson(response, result.statusCode, result.payload)
  }

  return sendJson(response, 404, {
    message: 'Route not found',
    path: pathname,
  })
}
