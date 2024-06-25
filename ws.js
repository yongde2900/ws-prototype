import WebSocket, { WebSocketServer } from "ws";
import { parse } from "url";

const wss = new WebSocketServer({ port: 8081 });

const roomClientMap = new Map();

wss.on("connection", (ws, req) => {
  console.log("New WebSocket client connected");

  const query = parse(req.url, true).query;
  roomClientMap.set(Number(query.room), ws);
  ws.room = Number(query.room);

  console.log(roomClientMap.keys());

  ws.on("message", (data) => {
    const msg = JSON.parse(data);
    sendMessage(Number(msg.room), msg.message);
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
    roomClientMap.delete(ws.room);
    console.log(roomClientMap.keys());
  });
});

function sendMessage(room, message) {
  const ws = roomClientMap.get(room);
  if (ws && ws.readyState === WebSocket.OPEN) ws.send(message);
}

console.log("WebSocket server is running on ws://localhost:8081");

export { wss };
