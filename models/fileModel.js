const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["file", "folder"],
    required: true,
  },
  content: {
    type: String, 
    default: "",
  },
  children: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model("File", fileSchema);
