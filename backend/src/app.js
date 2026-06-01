const express = require("express");
const userManagementRoutes =
  require("./routes/userManagementRoutes");
const cors = require("cors");
require("dotenv").config();
const adminRoutes =
  require("./routes/adminRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const authRoutes = require("./routes/authRoutes");
// const testRoutes = require("./routes/testRoutes");
const documentRoutes = require("./routes/documentRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("VerifyFlow API Running");
});

app.use("/api/auth", authRoutes);
// app.use("/api/test", testRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/admin", adminRoutes);
app.use(
  "/api/admin",
  userManagementRoutes
);

module.exports = app;