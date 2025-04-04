const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

app.post("/send", (req, res) => {
  const { sessionString, username, message } = req.body;
  console.log("👉 Получен запрос:", { sessionString, username, message });

  // Здесь будет логика Telegram
  res.json({ success: true, status: "Message received" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server listening on port", port);
});
