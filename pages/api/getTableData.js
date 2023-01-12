import prisma from "lib/prisma";

export default async function handle(req, res) {
  const husnegtData = req.body;

  if (req.method === "POST") {
    const resp = await prisma.husnegtdata.findMany({
      where: {
        zagvarId: Number(husnegtData.zagvar?.id) || -1,
        ognoo: { equals: husnegtData.ognoo },
      },
      select: {
        murId: true,
        baganaId: true,
        valueText: true,
      },
    });
    res.json(resp);
  }
}
