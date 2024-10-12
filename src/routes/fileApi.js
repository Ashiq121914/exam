const express = require("express");
const FileRouter = express.Router();
const {
  fileDelete,
  fileRead,
  fileUpload,
} = require("../controllers/fileController.js");
const AuthVerification = require("../middlewares/authVerification.js");

FileRouter.post("/upload-file", AuthVerification, fileUpload);
FileRouter.get("/read-file", AuthVerification, fileRead);
FileRouter.delete("/delete-file/:id", AuthVerification, fileDelete);

module.exports = FileRouter;
