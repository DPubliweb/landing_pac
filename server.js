const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// Logging API
app.post("/log-lead", (req, res) => {
  console.log("📩 LEAD SERVEUR :", req.body);
  res.send("ok");
});

// Serve React build
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Server running on " + PORT));
