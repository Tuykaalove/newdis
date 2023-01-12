import prisma from "lib/prisma";

export default async function handle(req, res) {
  const entityData = req.body.data;

  const UserRole = await prisma.entityuser.findFirst({
    where: { id: { equals: entityData.userId } },
    select: { role: true },
  });

  let edata = await prisma.entitydata.findFirst({
    where: {
      ognoo: {
        equals: entityData.ognoo,
      },
      tsag: {
        equals: Number(entityData.tsag),
      },
      stantsId: {
        equals: entityData.stantsId,
      },
      colId: {
        equals: entityData.colId,
      },
    },
  });

  if (
    (UserRole?.role === "DIS" && req.body.slug === "water") ||
    (UserRole?.role === "TSBA" && req.body.slug === "wwtp")
  ) {
    if (edata) {
      edata = await prisma.entitydata.update({
        where: {
          id: edata.id,
        },
        data: {
          valueText: entityData.type === "text" ? entityData.value : null,
          valueNumber:
            entityData.type === "number" ? Number(entityData.value) : null,
        },
      });
    } else if (entityData.value !== "" && entityData.value !== 0) {
      edata = await prisma.entitydata.create({
        data: {
          valueText: entityData.type === "text" ? entityData.value : null,
          valueNumber:
            entityData.type === "number" ? Number(entityData.value) : null,
          colId: entityData.colId,
          tsevId: entityData.tsevId,
          stantsId: entityData.stantsId,
          tempId: entityData.tempId,
          ognoo: entityData.ognoo,
          tsag: entityData.tsag,
          userId: entityData.userId,
        },
      });
    }
  }

  res.json(edata);
}
