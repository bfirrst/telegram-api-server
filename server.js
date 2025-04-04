const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running 🟢");
});

app.post("/send", (req, res) => {
  const { sessionString, username, message } = req.body;
  console.log("SEND:", { sessionString, username, message });
  res.json({ success: true, status: "Message sent" });
});

app.post("/bio", (req, res) => {
  const { sessionString, username } = req.body;
  console.log("BIO:", { sessionString, username });
  res.json({ success: true, status: "BIO received" });
});

app.post("/validate", (req, res) => {
  const { sessionString, username } = req.body;
  console.log("VALIDATE:", { sessionString, username });
  res.json({ success: true, status: "Validated successfully" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening on port", port);
});

