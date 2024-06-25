import express from "express";
import { fileURLToPath } from "url";
import WebSocket from "ws";
import { dirname, join } from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));

const ws = new WebSocket("ws://localhost:8081");
ws.onopen = () => {
  console.log("Connected");
};
ws.onclose = () => {
  console.log("Disconnected");
};

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/send", (req, res) => {
  const data = req.body;
  ws.send(JSON.stringify(data));
  res.send("Message sent");
});

app.listen(1000, () => {
  console.log("server running on port 1000");
});

export { app };
