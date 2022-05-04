const { now } = require("mongoose");
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const isvalidRequestBody = function (requestbody) {
    return Object.keys(requestbody).length > 0;
};

//==============================================================================//

const createCollege = async function (req, res) {
    try {
        let data = req.body;

        if (!isvalidRequestBody(data)) {
            return res
                .status(400)
                .send({ status: false, message: "please provide College details" });
        }

        if (!req.body.name) {
            return res
                .status(400)
                .send({ status: false, message: "name is required" });
        }
        if (!req.body.fullName) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: `fullName is required as example - Indian Institute of Technology, Hyderabad `,
                });
        }
        if (!req.body.logoLink) {
            return res
                .status(400)
                .send({ status: false, message: "logoLink is required" });
        }
        let name = await collegeModel.findOne({ name: req.body.name });
        console.log(name);
        if (name) {
            return res
                .status(400)
                .send({ status: false, message: `${req.body.name} already exist` });
        }

        let college = await collegeModel.create(data);

        res.status(201).send({ status: true, data: college });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

const collegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.collegeName;
        if (!collegeName) {
            return res
                .status(400)
                .send({ status: false, message: "enter college to filter" });
        }

        const college = await collegeModel.findOne({ name: collegeName, isDeleted:false});
        if(!college){
            res.status(404).send({status:false,message: "No college with this name"})
        }
        
        const filtercollege = {
            name:college.name,
            fullName:college.fullName,
            logoLink:college.logoLink
        }
        const Id = college._id
        const interns = await internModel.find({ collegeId: Id, isDeleted:false })
        if(interns){
            filtercollege.interests = interns
            res.status(200).send({status:true, data:filtercollege})
        }
    
       
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

module.exports.createCollege = createCollege;
module.exports.collegeDetails = collegeDetails;
