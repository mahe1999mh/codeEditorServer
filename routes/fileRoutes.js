const express = require("express");
const router = express.Router();
const {
  createFilefolders,
  getAll,
  getById,
  updateById,
  deleteById,
} = require("../controllers/fileController");

router.post("/", createFilefolders);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", updateById);
router.delete("/:id", deleteById);

module.exports = router;
