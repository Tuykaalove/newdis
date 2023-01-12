import prisma from "lib/prisma";

export default async function NewsApi(req, res) {
  const newsData = req.body;

  if (req.method === "POST") {
    const dayData = await prisma.entitynews.findFirst({
      where: {
        userId: { equals: newsData.userId },
        ognoo: { equals: newsData._date },
      },
      select: { ognoo: true },
    });
    if (newsData.news !== "" && dayData?.ognoo === undefined) {
      const data = await prisma.entitynews.create({
        data: {
          ognoo: newsData._date,
          news: newsData.news,
          userId: newsData.userId,
        },
      });
      res.json(data);
    }
  } else if (req.method === "PUT") {
    let nData = await prisma.entitynews.findFirst({
      where: {
        userId: { equals: newsData.userId },
        ognoo: { equals: newsData._date },
      },
    });
    if (nData && newsData.news !== "") {
      nData = await prisma.entitynews.update({
        where: {
          id: nData.id,
        },
        data: {
          news: newsData.news,
        },
      });
    }
    res.json(nData);
  }
}
