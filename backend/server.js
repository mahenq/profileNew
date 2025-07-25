// File: backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const adminRoutes = require("./routes/adminRoutes");
const customerRoutes = require("./routes/customerRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/admin", adminRoutes);
app.use("/api/customers", customerRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Fallback for React SPA
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
