// backend/controllers/customerController.js
const db = require("../models/db");

exports.createCustomer = async (req, res) => {
	const { name, email, message } = req.body;

	try {
		await db.query(
			"INSERT INTO customers (name, email, message, status, notes, created_at) VALUES ($1, $2, $3, 'baru', '', NOW())",
			[name, email, message]
		);
		res.status(201).json({ message: "Pesan berhasil dikirim" });
	} catch (error) {
		console.error("Gagal menyimpan pesan", error);
		res.status(500).json({ error: "Gagal menyimpan pesan" });
	}
};
