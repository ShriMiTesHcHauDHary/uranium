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