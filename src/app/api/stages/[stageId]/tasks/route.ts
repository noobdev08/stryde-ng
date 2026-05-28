import { requireAuth } from '@/utils/middleware/apiAuth';
import prisma from '@/utils/lib/prismaClient'

export async function GET(request: Request, { params }: { params: Promise<{ stageId: string }> }) {
    const { user, response } = await requireAuth();
    if (response) return response;

    const { stageId } = await params;

    const task = await prisma.task.findMany({
        where: {
            stageId: stageId
        },
        orderBy: {
            order: 'asc'
        }
    });

    const completed = await prisma.userProgress.findMany({
        where: { userId: user!.id, task: { stageId } },
        select: { taskId: true }
    })

    return Response.json({ data: task, completed: completed })
}