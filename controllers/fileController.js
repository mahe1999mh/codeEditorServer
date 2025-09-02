// controllers/fileController.js
const File = require("../models/fileModel");

// Create a new file/folder
const createFilefolders = async (req, res) => {
  try {
    const file = new File(req.body);
    await file.save();
    res.status(201).json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all files/folders
const getAll = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single file/folder by ID
const getById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "Not found" });
    res.status(200).json(file);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a file/folder by ID
const updateById = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!file) return res.status(404).json({ message: "Not found" });
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete a file/folder by ID
const deleteById = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createFilefolders,
  getAll,
  getById,
  updateById,
  deleteById,
};
