import prisma from "./prismaClient"

export async function calculateStreak(userId: string): Promise<number> {
  const allProgress = await prisma.userProgress.findMany({
    where: { userId },
    select: { completedAt: true },
    orderBy: { completedAt: 'asc' }
  })

  if (allProgress.length === 0) return 0

  // Get unique dates in YYYY-MM-DD format
  const uniqueDates = new Set(
    allProgress.map((p: { completedAt: Date }) => {
      const date = new Date(p.completedAt)
      return date.toISOString().split('T')[0]
    })
  )

  if (uniqueDates.size === 0) return 0

  // Get today's date
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  // Get yesterday's date
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  // Determine starting point
  let currentCheckDate: Date
  if (uniqueDates.has(todayStr)) {
    // User completed something today, start from today
    currentCheckDate = new Date(today)
  } else if (uniqueDates.has(yesterdayStr)) {
    // User completed something yesterday, start from yesterday
    currentCheckDate = new Date(yesterday)
  } else {
    // No activity today or yesterday, streak is broken
    return 0
  }

  // Count consecutive days backwards
  let streak = 0

  while (true) {
    const dateStr = currentCheckDate.toISOString().split('T')[0]

    if (uniqueDates.has(dateStr)) {
      streak++
      currentCheckDate.setDate(currentCheckDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

export function getStreakIconCount(streak: number): number {
  if (streak === 0) return 1
  if (streak < 3) return 1
  if (streak < 7) return 2
  if (streak < 14) return 3
  return 4
}
