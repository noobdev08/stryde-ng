type TaskWithProgress = {
  userProgress: Array<{ userId: string }>
}

export function calculateTaskProgress(tasks: TaskWithProgress[]): {
  completedCount: number
  progressPercent: number
  totalCount: number
} {
  const totalCount = tasks.length
  const completedCount = tasks.filter(t => t.userProgress.length > 0).length
  const progressPercent = totalCount > 0
    ? Math.round((completedCount / totalCount) * 100)
    : 0

  return { completedCount, progressPercent, totalCount }
}

export function calculatePathProgress(stages: Array<{ tasks: TaskWithProgress[] }>) {
  const allTasks = stages.flatMap(s => s.tasks)
  return calculateTaskProgress(allTasks)
}
