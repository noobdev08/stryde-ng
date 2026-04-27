import { createClient } from "@/utils/supabase/server";
import prisma from "@/utils/lib/prismaClient";

export async function POST(request: Request, { params }: { params: Promise<{ taskId: string }> }) {
    const supabase = await createClient();
    const { taskId } = await params;

    const { data: { user }, error } = await supabase.auth.getUser();

    if (!user) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const task = await prisma.userProgress.create({
        data: {
            userId: user.id,
            taskId: taskId
        }
    });

    return Response.json({ success: true })
}