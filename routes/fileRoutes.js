const express = require("express");
const router = express.Router();
const {
  createFilefolders,
  getAll,
  getById,
  updateById,
  deleteById,
} = require("../controllers/fileController");
const {verifyToken} = require("../middleware/authMiddleware");

router.post("/", createFilefolders);
router.get("/", verifyToken, getAll);
router.get("/:id", verifyToken, getById);
router.put("/:id", verifyToken, updateById);
router.delete("/:id", verifyToken, deleteById);

module.exports = router;
