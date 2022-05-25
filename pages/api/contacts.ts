import nc from "next-connect";
import sanitizeEmail from "sanitize-mail";
import { getContacts } from "../../firebase/contacts";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler.get(async (req, res) => {
  const { currentUser } = req.query;
  const sanitizedEmail = sanitizeEmail(currentUser);
  const contacts = await getContacts({ currentUserEmail: sanitizedEmail });
  res.json(contacts);
});

handler.post((req, res) => {
  res.json({ hello: "world" });
});

export default handler;
