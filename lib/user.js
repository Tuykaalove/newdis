import crypto from "crypto";
import prisma from "lib/prisma";

//Create Admin
export async function createAdmin({ username, password }) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  const user = await prisma.admin.create({
    data: {
      username: username,
      hash: hash,
      salt: salt,
    },
  });

  return { user };
}

//Find Admin
export async function findAdmin({ username }) {
  const user = await prisma.admin.findUnique({
    where: { username: username },
  });
  return user;
}

//Create User
export async function createUser({
  username,
  password,
  nickName,
  role,
  sortOrder,
}) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  const user = await prisma.entityuser.create({
    data: {
      name: username,
      hash: hash,
      nickName: nickName,
      role: role,
      sortOrder: sortOrder,
      salt: salt,
    },
  });

  return { user };
}

//Find User
export async function findUser({ username }) {
  const user = await prisma.entityuser.findUnique({
    where: { name: username },
  });
  return user;
}

export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
