const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const auth = require("../middleware/auth");

// Hanya admin yang boleh akses semua route berikut
router.get("/", auth, customerController.getAll);
router.post("/", customerController.create); // form publik tidak butuh auth
router.put("/:id", auth, customerController.update);
router.delete("/:id", auth, customerController.remove);

module.exports = router;
