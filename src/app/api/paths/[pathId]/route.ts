import prisma from '@/utils/lib/prismaClient';

export async function GET(request: Request, { params }: { params: Promise<{ pathId: string }> }) {
    const { pathId } = await params;

    const paths = await prisma.stage.findMany({
        where: {
            pathId: pathId
        },
        orderBy: {
            order: 'asc'
        }
    });

    return Response.json({ data: paths })
}