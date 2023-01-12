import prisma from "lib/prisma";

export default async function NewsApi(req, res) {
  const userId = req.query.id;
  const uID = parseInt(userId);

  if (req.body.month !== 11) {
    const data = await prisma.entitynews.findMany({
      where: {
        userId: { equals: Number(uID) },
        ognoo: {
          gte: req.body.startD,
          lt: req.body.endD,
        },
      },
      select: { news: true, ognoo: true },
      orderBy: { ognoo: "desc" },
    });
    res.json(data);
  } else {
    const data = await prisma.entitynews.findMany({
      where: {
        userId: { equals: Number(uID) },
        ognoo: {
          gte: req.body.startD,
          lte: req.body.endD,
        },
      },
      select: { news: true, ognoo: true },
      orderBy: { ognoo: "desc" },
    });
    res.json(data);
  }
}
