import prisma from "lib/prisma";

export default async function handle(req, res) {
  const husnegtData = req.body;

  const UserRole = await prisma.entityuser.findFirst({
    where: { id: { equals: husnegtData.userId } },
    select: { role: true },
  });

  let edata = await prisma.husnegtdata.findFirst({
    where: {
      ognoo: {
        equals: husnegtData.ognoo,
      },
      murId: {
        equals: husnegtData.murId,
      },
      baganaId: {
        equals: husnegtData.baganaId,
      },
    },
  });

  if (
    husnegtData.design === "task" ||
    husnegtData.design === "nextday" ||
    husnegtData.design === "burning" ||
    husnegtData.design === "car"
  ) {
    if (UserRole?.role === "DIS") {
      if (edata) {
        edata = await prisma.husnegtdata.update({
          where: {
            id: edata.id,
          },
          data: {
            valueText: husnegtData.value,
          },
        });
      } else if (husnegtData.value !== "") {
        edata = await prisma.husnegtdata.create({
          data: {
            valueText: husnegtData.value,
            baganaId: husnegtData.baganaId,
            murId: husnegtData.murId,
            zagvarId: husnegtData.zagvarId,
            ognoo: husnegtData.ognoo,
            userId: husnegtData.userId,
          },
        });
      }
    }
  } else {
    if (UserRole?.role === "BAAZ") {
      if (edata) {
        edata = await prisma.husnegtdata.update({
          where: {
            id: edata.id,
          },
          data: {
            valueText: husnegtData.value,
          },
        });
      } else {
        edata = await prisma.husnegtdata.create({
          data: {
            valueText: husnegtData.value,
            baganaId: husnegtData.baganaId,
            murId: husnegtData.murId,
            zagvarId: husnegtData.zagvarId,
            ognoo: husnegtData.ognoo,
            userId: husnegtData.userId,
          },
        });
      }
    }
  }

  res.json(edata);
}
