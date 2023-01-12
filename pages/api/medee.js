import prisma from "lib/prisma";

export default async function handle(req, res) {
  const medee = req.body;

  if (req.method === "POST") {
    const resp = await prisma.entitynews.findMany({
      where: { ognoo: medee.ognoo },
      select: {
        id: true,
        news: true,
        entityuser: { select: { nickName: true } },
      },
      orderBy: { entityuser: { sortOrder: "asc" } },
    });
    res.json(resp);
  }
}
