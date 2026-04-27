import { createClient } from '@/utils/supabase/server';
import prisma from '@/utils/lib/prismaClient'

export async function GET(request: Request, { params }: { params: Promise<{ stageId: string }> }) {
    const supabase = await createClient();
    const { stageId } = await params;
    // now use stageId in your query

    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const task = await prisma.task.findMany({
        where: {
            stageId: stageId
        },
        orderBy: {
            order: 'asc'
        }
    });

    const completed = await prisma.userProgress.findMany({
        where: { userId: user.id, task: { stageId } },
        select: { taskId: true }
    })

    return Response.json({ data: task, completed: completed })
}