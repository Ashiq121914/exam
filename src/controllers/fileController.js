const fs = require("fs");
const path = require("path");

const fileModel = require("../models/fileModel.js");
const MulterFileUpload = require("../utility/multerHelper.js");

// file upload
exports.fileUpload = async (req, res) => {
  try {
    const { email } = req.headers;

    //multer file upload
    MulterFileUpload().single("file")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "File Upload Failed" });
      }

      const update = await fileModel.create({
        email: email,
        file: req.file.filename,
      });

      //file upload success message
      res.status(200).json({
        message: "File updated successfully",
        filePath: req.file.filename,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};

// file read
exports.fileRead = async (req, res) => {
  try {
    const { email } = req.headers;

    const baseURL = "http://localhost:5050/";

    const fileFind = await fileModel.find({ email: email });

    return res.status(200).json({
      file: fileFind,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};

// file delete
exports.fileDelete = async (req, res) => {
  try {
    const { id } = req.params;

    // const email = req.headers.email;

    const fileFind = await fileModel.findById(id);

    if (!fileFind) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    // Delete the file from the filesystem
    const filePath = path.join(process.cwd(), "uploads", fileFind.file);

    // Delete the file from the filesystem
    fs.unlink(filePath, async (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error deleting file",
          error: err.message,
        });
      }

      //delete record in database
      await fileModel.findByIdAndDelete(id);

      return res.status(200).json({
        message: "File deleted successfully",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};
