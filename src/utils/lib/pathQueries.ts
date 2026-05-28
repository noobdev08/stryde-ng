import prisma from "./prismaClient"

export async function getAllPathsWithProgress(userId: string) {
  return prisma.path.findMany({
    include: {
      stages: {
        include: {
          tasks: {
            include: {
              userProgress: {
                where: { userId }
              }
            }
          }
        }
      }
    },
    orderBy: { order: 'asc' }
  })
}
