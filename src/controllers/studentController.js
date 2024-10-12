let md5 = require("md5");
const stundentModel = require("../models/studentModel.js");
const { EncodeToken } = require("../utility/tokenHelper.js");

// Create student
exports.register = async (req, res) => {
  try {
    let reqBody = req.body;

    // hashing credential
    reqBody.password = md5(req.body.password);
    let student = await stundentModel.find({ reqBody });
    if (student.length > 0) {
      res.status(200).json({ status: "error", msg: "have account" });
    } else {
      let data = await stundentModel.create(reqBody);
      res.status(200).json({ status: "success", data: data });
    }
  } catch (e) {
    res.status(200).json({ status: "error", error: e });
  }
};

// student login
exports.login = async (req, res) => {
  try {
    let reqBody = req.body;
    reqBody.password = md5(req.body.password);
    let data = await stundentModel.aggregate([
      { $match: reqBody },
      { $project: { _id: 1, email: 1 } },
    ]);

    if (data.length > 0) {
      let token = EncodeToken(data[0]["email"]);

      // Set cookie
      let options = {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      // setting the cookie
      res.cookie("Token", token, options);
      res.status(200).json({ status: "success", token: token, data: data[0] });
    } else {
      res.status(200).json({ status: "unauthorized", data: data });
    }
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

// read student
exports.profile_read = async (req, res) => {
  let email = req.headers.email;
  try {
    let MatchStage = {
      $match: {
        email,
      },
    };

    let project = {
      $project: {
        email: 1,
        firstName: 1,
        lastName: 1,
        img: 1,
        phone: 1,
      },
    };

    let data = await stundentModel.aggregate([MatchStage, project]);

    res.status(200).json({ status: "success", data: data[0] });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

// update student
exports.UpdateStudent = async (req, res) => {
  try {
    let email = req.headers.email;
    let query = { email: email };
    let UpdateData = req.body;
    const updatedData = await stundentModel.updateOne(query, UpdateData);
    res.status(200).json({
      status: "success",
      data: updatedData,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "An error occurred while updating the students",
    });
  }
};
