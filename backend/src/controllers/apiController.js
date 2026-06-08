import {
  couponLookup,
  mockData,
  pricingLookup,
  tournamentRegistrationStore,
} from '../data/mockData.js'

function formatRegistrationDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function createRegistrationId() {
  return `REG-${Math.floor(100000 + Math.random() * 900000)}`
}

export function getHealth() {
  return {
    statusCode: 200,
    payload: {
      status: 'ok',
      service: 'alpha-game-zone-api',
      timestamp: '2026-06-01T22:00:00+05:30',
    },
  }
}

export function getHomepage() {
  return {
    statusCode: 200,
    payload: mockData.homepage,
  }
}

export function getBookingOptions() {
  return {
    statusCode: 200,
    payload: {
      setups: mockData.homepage.setups,
      slots: mockData.slots,
      coupons: Object.keys(couponLookup),
    },
  }
}

export function getTournaments() {
  return {
    statusCode: 200,
    payload: mockData.tournaments,
  }
}

export function getUserDashboard() {
  return {
    statusCode: 200,
    payload: mockData.userDashboard,
  }
}

export function getAdminDashboard() {
  return {
    statusCode: 200,
    payload: mockData.adminDashboard,
  }
}

export function getTournamentRegistrations(userId = '') {
  if (!userId) {
    return {
      statusCode: 200,
      payload: [],
    }
  }

  return {
    statusCode: 200,
    payload: tournamentRegistrationStore.filter((registration) => registration.userId === userId),
  }
}

export function createBookingQuote(body = {}) {
  const price = pricingLookup[body.setupId] ?? pricingLookup.ps5
  const slot = mockData.slots.find((item) => item.id === body.slotId) ?? mockData.slots[0]
  const players = Number(body.players ?? 1)
  const controllers = Number(body.controllers ?? 0)
  const playerCharge = Math.max(players - 2, 0) * 149
  const controllerCharge = controllers * 179
  const subtotal = price * slot.hours + playerCharge + controllerCharge
  const discountRate = couponLookup[(body.coupon ?? '').toUpperCase()] ?? 0
  const discountAmount = Math.round((subtotal * discountRate) / 100)

  return {
    statusCode: 200,
    payload: {
      subtotal,
      discountRate,
      discountAmount,
      total: subtotal - discountAmount,
      slot: slot.label,
    },
  }
}

export function registerTournament(body = {}) {
  const tournament =
    mockData.tournaments.find((item) => item.id === body.tournamentId) ?? null

  const teamName = body.teamName?.trim()
  const captainName = body.captainName?.trim()
  const mobileNumber = body.mobileNumber?.trim()
  const gameId = body.gameId?.trim()

  if (!body.userId || !teamName || !captainName || !mobileNumber || !gameId) {
    return {
      statusCode: 400,
      payload: {
        message: 'Missing required registration details.',
      },
    }
  }

  if (!body.agreeToRules) {
    return {
      statusCode: 400,
      payload: {
        message: 'Tournament rules must be accepted before registering.',
      },
    }
  }

  if (!tournament) {
    return {
      statusCode: 404,
      payload: {
        message: 'Tournament not found.',
      },
    }
  }

  const createdAt = new Date().toISOString()
  const registration = {
    id: createRegistrationId(),
    userId: body.userId,
    tournamentId: tournament.id,
    tournamentName: tournament.title,
    tournamentDate: tournament.date,
    tournamentTime: tournament.time,
    registrationDate: formatRegistrationDate(createdAt),
    teamName,
    captainName,
    mobileNumber,
    gameId,
    status: 'Pending Approval',
    matchSchedule: 'Schedule will appear here once the bracket is published.',
    createdAt,
  }

  tournamentRegistrationStore.unshift(registration)

  return {
    statusCode: 201,
    payload: registration,
  }
}
