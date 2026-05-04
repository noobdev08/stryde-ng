"use server"
import prisma from "@/utils/lib/prismaClient"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function completeTask(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    // Pull the values out of the hidden inputs
    const taskId = formData.get("taskId") as string
    const stageId = formData.get("stageId") as string
    const pathId = formData.get("pathId") as string

    await prisma.userProgress.upsert({
        where: {
            userId_taskId: { userId: user.id, taskId }
        },
        update: { completedAt: new Date() }, // Use the correct field name
        create: {
            userId: user.id,
            taskId,
            completedAt: new Date()
        }
    })

    // Refresh the data
    revalidatePath(`/paths/${pathId}/${stageId}`)
    redirect(`/paths/${pathId}/${stageId}`)
}