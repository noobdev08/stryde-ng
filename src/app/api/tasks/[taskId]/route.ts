import { requireAuth } from "@/utils/middleware/apiAuth";
import prisma from "@/utils/lib/prismaClient";

export async function POST(request: Request, { params }: { params: Promise<{ taskId: string }> }) {
    const { user, response } = await requireAuth();
    if (response) return response;

    const { taskId } = await params;

    const task = await prisma.userProgress.create({
        data: {
            userId: user!.id,
            taskId: taskId
        }
    });

    return Response.json({ success: true })
}