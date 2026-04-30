import prisma from "./prismaClient"

export async function getPathWithProgress(pathId: string, userId: string) {
  const path = await prisma.path.findUnique({
    where: { id: pathId },
    include: {
      stages: {
        orderBy: { order: 'asc' },
        include: {
          tasks: {
            orderBy: { order: 'asc' },
            include: {
              userProgress: {
                where: { userId: userId }
              }
            }
          }
        }
      }
    }
  })

  if (!path) return null

  // Calculate overall percentage
  const allTasks = path.stages.flatMap(s => s.tasks)
  const completedTasks = allTasks.filter(t => t.userProgress.length > 0)
  const progressPercent = allTasks.length > 0 
    ? Math.round((completedTasks.length / allTasks.length) * 100) 
    : 0

  return { ...path, progressPercent }
}

export async function getStageWithProgress(stageId: string, userId: string) {
  const stage = await prisma.stage.findUnique({
    where: { id: stageId },
    include: {
      tasks: {
        orderBy: { order: 'asc' },
        include: {
          userProgress: {
            where: { userId: userId }
          }
        }
      }
    }
  })

  if (!stage) return null

  const completedCount = stage.tasks.filter(t => t.userProgress.length > 0).length
  const progressPercent = stage.tasks.length > 0 
    ? Math.round((completedCount / stage.tasks.length) * 100) 
    : 0

  return { 
    ...stage, 
    completedCount, 
    progressPercent 
  }
}