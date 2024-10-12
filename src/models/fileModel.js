const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    email: { type: String, lowercase: true },
    file: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamp: true }
);

const FileUpload = mongoose.model("files", fileSchema);

module.exports = FileUpload;
