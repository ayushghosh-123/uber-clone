const socketIo = require("socket.io");
const UserModel = require("./models/user.model");
const CaptainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"], // ✅ Correct key
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`user ${userId} joint as ${userType}`)
      console.log(socket.id)

      try {
        if (userType === "user") {
          await UserModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await CaptainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
        console.log(`Socket ID ${socket.id} saved for ${userType}: ${userId}`);
      } catch (err) {
        console.error("Error saving socket ID to DB:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocket(socketId, message) {
  if (io) {
    io.to(socketId).emit("message", message);
  } else {
    console.log("Socket server not initialized or client not connected.");
  }
}

module.exports = { initializeSocket, sendMessageToSocket };
