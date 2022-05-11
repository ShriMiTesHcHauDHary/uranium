const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");

const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestbody) {
  return Object.keys(requestbody).length > 0;
};

//=========================================2 api ==================================================

const createIntern = async function (req, res) {
  try {
    const requestBody = req.body; //reading input

    if (!isValidRequestBody(requestBody)) {
      res
        .status(400)
        .send({
          status: false,
          message: "Invalid request parameters. Please provide intern details",
        });
      return;
    }
    //  EXTRACT PARAMS
    const { name, email, mobile, collegeName } = requestBody;//ignore not find function

    //  VALIDATION
    if (!isValid(name)) {
      res
        .status(400)
        .send({ status: false, message: "Intern name is required" });
      return;
    }
    if (!isValid(email)) {
      res
        .status(400)
        .send({ status: false, message: "Intern email is required" });
      return;
    }
    if (!isValid(collegeName)) {
      res
        .status(400)
        .send({ status: false, message: "  intern College name is required" });
      return;
    }

    if (requestBody.email) {
      let validmail = /^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(
        requestBody.email
      );
      if (!validmail) {
        return res
          .status(400)
          .send({ status: false, message: "  Enter valid email" });
      }
    }

    const isEmailAlreadyUsed = await internModel.findOne({ email });
    if (isEmailAlreadyUsed) {
      res
        .status(400)
        .send({
          status: false,
          message: `${email} Email is already used, try different one `,
        });
      return;
    }
    
    if (!isValid(mobile)) {
      res
        .status(400)
        .send({ status: false, message: "Intern mobile is required" });
      return;
    }

    const validMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile);
    if (!validMobile) {
      return res
        .status(400)
        .send({ status: false, msg: "Enter valid mobile no." });
    }

    const ismobileAlreadyUsed = await internModel.findOne({ mobile });
    if (ismobileAlreadyUsed) {
      res
        .status(400)
        .send({
          status: false,
          message: `${mobile} mobile is already used, try different one`,
        });
      return;
    }

    // FIND COLLEGE NAME IN COLLEGE MODEL
    const collegenameDetails = await collegeModel.findOne({
      name: collegeName,
      isDeleted: false,
    });
    if (!collegenameDetails) {
      res
        .status(404)
        .send({ status: false, message: "No college exist with this name" });
      return;
    }

    // COLLEGEID===COLLEGENAME
    const collegeId = collegenameDetails["_id"];

    // EXTRACT INTERN PARAMS
    const interndata = { name, email, mobile, collegeId };

    // CREATE INTERN DATA
    const newIntern = await internModel.create(interndata);
    res
      .status(201)
      .send({
        status: true,
        message: "New Intern created successfully",
        data: newIntern,
      });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.createIntern = createIntern;




//validation
const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.length === 0) return false;
  return true;
};

const isValidRequestBody = function (requestbody) {
  return Object.keys(requestbody).length > 0;
};

const isValidSyntaxOfEmail = function (value) {
  if (!validator.validate(value)) {
    return false;
  }
  return true;
};



const login = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!validator.isvalidRequestBody(requestBody)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide data to signIn" });
    }
    const { email, password } = requestBody;

    if (!validator.isvalid(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide email" });
    }

    if (!validator.isValidSyntaxOfEmail(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide valid email" });
    }

    if (!validator.isvalid(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide password" });
    }

    const findEmail = await employeeModel.findOne({ email });
    if (!findEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "user does'nt exist with this email" });
    }

    const findPassword = await employeeModel.findOne({ password });
    if (!findPassword) {
      return res
        .status(400)
        .send({ status: false, msg: "Please fill correct password" });
    }

    const data = { email, password };
    if (data) {
      let payload = { email: email, password: password };
      const generateToken = jwt.sign(payload, "booksManagementGroupX");
      res
        .status(200)
        .send({ msg: "user login sucessfully", token: generateToken });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: false, data: err.message });
  }
};