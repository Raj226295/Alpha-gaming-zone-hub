import { couponLookup, mockData, pricingLookup } from '../data/mockData.js'

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
    mockData.tournaments.find((item) => item.id === body.tournamentId) ?? mockData.tournaments[0]

  return {
    statusCode: 201,
    payload: {
      passId: `PASS-${Math.floor(100 + Math.random() * 900)}`,
      title: tournament.title,
      teamName: body.teamName || 'Walk-in Squad',
      captain: body.captain || 'Team Captain',
      fee: tournament.fee,
      paymentMethod: body.paymentMethod || 'UPI',
      checkIn: `${tournament.date} - 1 hour before start`,
    },
  }
}
