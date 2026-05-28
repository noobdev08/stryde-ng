import prisma from "./prismaClient"
import { calculatePathProgress } from "./progressCalculator"

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

  const { progressPercent } = calculatePathProgress(path.stages)
  return { ...path, progressPercent }
}

import { calculateTaskProgress } from "./progressCalculator"

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

  const { completedCount, progressPercent } = calculateTaskProgress(stage.tasks)
  return { ...stage, completedCount, progressPercent }
}