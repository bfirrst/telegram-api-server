const express = require("express");
const { StringSession } = require("telegram/sessions");
const { TelegramClient } = require("telegram");

const app = express();
app.use(express.json());

const apiId = 2040;
const apiHash = "b18441a1ff607e10a989891a5462e627";

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

async function createClient(sessionString) {
  try {
    return new TelegramClient(new StringSession(sessionString), apiId, apiHash, {
      connectionRetries: 3,
    });
  } catch (err) {
    throw new Error("Invalid session string format");
  }
}

app.post("/send", async (req, res) => {
  const { sessionString, username, message } = req.body;

  if (!sessionString || !username || !message) {
    return res.status(400).json({ success: false, error: "Missing parameters" });
  }

  try {
    const client = await createClient(sessionString);
    await client.connect();
    await client.sendMessage(username, { message });
    await client.disconnect();
    res.json({ success: true, status: "sent" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/bio", async (req, res) => {
  const { sessionString, username } = req.body;

  if (!sessionString || !username) {
    return res.status(400).json({ success: false, error: "Missing parameters" });
  }

  try {
    const client = await createClient(sessionString);
    await client.connect();
    const user = await client.getEntity(username);
    await client.disconnect();
    res.json({ success: true, bio: user.about || "" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/validate", async (req, res) => {
  const { sessionString, username } = req.body;

  if (!sessionString || !username) {
    return res.status(400).json({ success: false, error: "Missing parameters" });
  }

  try {
    const client = await createClient(sessionString);
    await client.connect();
    const entity = await client.getEntity(username);
    await client.disconnect();
    res.json({ success: true, status: entity ? "valid" : "invalid" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server listening on port", port);
});
