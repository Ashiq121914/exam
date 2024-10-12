const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/studentController.js");
const AuthVerification = require("../middlewares/authVerification.js");

// Student api
router.post("/register", StudentController.register);
router.post("/login", StudentController.login);
router.get("/read", AuthVerification, StudentController.profile_read);
router.post("/update", AuthVerification, StudentController.UpdateStudent);

module.exports = router;
