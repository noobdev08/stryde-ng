import prisma from '@/utils/lib/prismaClient'

export async function GET(request: Request) {
    const paths = await prisma.path.findMany({
        orderBy: {
            order: 'asc'
        }
    })

    return Response.json({ data: paths })
};