const db = require("../models/db");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
	const { email, password } = req.body;
	console.log("Email dari body:", email);

	try {
		const result = await db.query("SELECT * FROM admins WHERE email = $1", [
			email,
		]);
		const admin = result.rows[0];

		if (!admin) {
			return res.status(401).json({ error: "Email tidak ditemukan" });
		}

		if (password !== admin.password) {
			return res.status(401).json({ error: "Password salah" });
		}

		const token = jwt.sign(
			{ id: admin.id, email: admin.email },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		res.json({ token });
	} catch (error) {
		console.error("Login error:", error.message);
		res.status(500).json({ error: "Gagal login admin" });
	}
};
