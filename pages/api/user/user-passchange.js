import prisma from "lib/prisma";
import crypto from "crypto";

export default async function handle(req, res) {
  const user = req.body;

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(user.password, salt, 1000, 64, "sha512")
    .toString("hex");

  let data = await prisma.entityuser.findFirst({
    where: { id: user.userId },
  });

  if (data) {
    data = await prisma.entityuser.update({
      where: { id: data.id },
      data: {
        hash: hash,
        salt: salt,
      },
    });
    res.status(200).send({ message: "SUCCESS" });
  } else res.status(401).send({ message: "ERROR" });
}
