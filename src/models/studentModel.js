const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    studentID: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String },
    img: { type: String },
    department: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: Number, required: true },
    gpa: { type: Number },
    address: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const studentModel = mongoose.model("students", DataSchema);

module.exports = studentModel;
