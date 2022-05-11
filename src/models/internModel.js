const mongoose = require("mongoose");//importing mongoose(object data modeling library)
const collegeModel = require("./collegeModel");
const ObjectId = mongoose.Schema.Types.ObjectId;//objectId validation
//creating structure of documents
const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    collegeId: {
      type: ObjectId,
      ref: collegeModel,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("intern", internSchema);//naming new collection made Schema

// { 
//   title: {string, mandatory, enum[Mr, Mrs, Miss]},1.)
//   name: {string, mandatory},
//   phone: {string, mandatory, unique},==
//   email: {string, mandatory, valid email, unique}, 
//   password: {string, mandatory, minLen 8, maxLen 15}, if(<8 || >15)
//   address: {
//     street: {string},
//     city: {string},
//     pincode: {string}
//   },
//   createdAt: {timestamp},
//   updatedAt: {timestamp}
// }

const mongoose = require("mongoose");//importing mongoose(object data modeling library)
const collegeModel = require("./collegeModel");

//creating structure of documents
const userSchema = new mongoose.Schema(
  {

    title:{
      type:String,
      required:true,
      enum:["Mr", "Mrs", "Miss","master"]
    },
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      unique:true
    },
    email: {
      type: String,
      required:true,
      unique:true,
      trim: true,
    },
    password:{
      type:string,
      required:true,
    },
    address: {
          street:string ,
          city:string,
          pincode:string
        },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);//naming new collection made Schema




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
    const { title, name, email, mobile, collegeName } = requestBody;//ignore not find function

    //  VALIDATION
    if(!isValid(title)) {
      res
        .status(400)
        .send({ status: false, message: "title is required" });
      return;
    }
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