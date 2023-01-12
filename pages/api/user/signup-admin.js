import { createAdmin } from "lib/user";

export default async function signup(req, res) {
  try {
    await createAdmin(req.body);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
