const STORAGE_KEY = 'alpha-game-zone.tournament-registrations'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

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

function normalizeRegistration(record = {}) {
  return {
    id: record.id ?? createRegistrationId(),
    userId: record.userId ?? '',
    tournamentId: record.tournamentId ?? '',
    tournamentName: record.tournamentName ?? record.title ?? 'Tournament',
    tournamentDate: record.tournamentDate ?? record.date ?? '',
    tournamentTime: record.tournamentTime ?? record.time ?? '',
    teamName: record.teamName ?? record.team ?? '',
    captainName: record.captainName ?? record.captain ?? '',
    mobileNumber: record.mobileNumber ?? record.contact ?? '',
    gameId: record.gameId ?? record.riotId ?? '',
    registrationDate:
      record.registrationDate ??
      (record.createdAt ? formatRegistrationDate(record.createdAt) : formatRegistrationDate(Date.now())),
    status: record.status ?? 'Pending Approval',
    matchSchedule:
      record.matchSchedule ?? 'Schedule will appear here once the bracket is published.',
    createdAt: record.createdAt ?? new Date().toISOString(),
  }
}

function readLocalRegistrations() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)
    const parsedValue = rawValue ? JSON.parse(rawValue) : []

    return Array.isArray(parsedValue) ? parsedValue.map(normalizeRegistration) : []
  } catch {
    return []
  }
}

function writeLocalRegistrations(registrations) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations))
}

function upsertLocalRegistration(registration) {
  const currentRegistrations = readLocalRegistrations()
  const nextRegistrations = [
    registration,
    ...currentRegistrations.filter((item) => item.id !== registration.id),
  ]

  writeLocalRegistrations(nextRegistrations)
}

function createFallbackRegistration(payload, tournament) {
  const createdAt = new Date().toISOString()

  return normalizeRegistration({
    id: createRegistrationId(),
    userId: payload.userId,
    tournamentId: tournament.id,
    tournamentName: tournament.title,
    tournamentDate: tournament.date,
    tournamentTime: tournament.time,
    teamName: payload.teamName,
    captainName: payload.captainName,
    mobileNumber: payload.mobileNumber,
    gameId: payload.gameId,
    registrationDate: formatRegistrationDate(createdAt),
    status: 'Pending Approval',
    matchSchedule: 'Schedule will appear here once the bracket is published.',
    createdAt,
  })
}

export async function fetchTournamentRegistrations(userId) {
  if (!userId) {
    return []
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/tournaments/registrations?userId=${encodeURIComponent(userId)}`,
    )

    if (!response.ok) {
      throw new Error('Unable to load tournament registrations right now.')
    }

    const payload = await response.json()

    return Array.isArray(payload) ? payload.map(normalizeRegistration) : []
  } catch {
    return readLocalRegistrations().filter((registration) => registration.userId === userId)
  }
}

export async function registerTournamentEntry(payload, tournament) {
  const fallbackRegistration = createFallbackRegistration(payload, tournament)

  try {
    const response = await fetch(`${API_BASE_URL}/api/tournaments/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null)

      throw new Error(errorPayload?.message ?? 'Unable to register for this tournament right now.')
    }

    const savedRegistration = normalizeRegistration(await response.json())

    upsertLocalRegistration(savedRegistration)

    return savedRegistration
  } catch (error) {
    if (error instanceof TypeError) {
      upsertLocalRegistration(fallbackRegistration)
      return fallbackRegistration
    }

    throw error
  }
}
