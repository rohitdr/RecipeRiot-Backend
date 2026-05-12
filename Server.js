require("dotenv").config();
const mongoose = require("mongoose");
const mongooseConnectToDb = require("./db");
const app = require("./App");

const PORT = process.env.PORT || 5000;

let server;
let isShuttingDown = false;

const shutdown = async () => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log("🛑 Shutting down server...");

  try {
    if (server) {
      server.close(() => {
        console.log("✅ HTTP server closed");
      });
    }

    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log("✅ MongoDB connection closed");
    }
  } catch (err) {
    console.error("❌ Shutdown error:", err);
  }

  setTimeout(() => {
    console.log("⚠️ Force shutdown");
    process.exit(1);
  }, 5000);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

mongooseConnectToDb()
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });