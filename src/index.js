const express = require("express"); //server side web frame work (ex-router,code excution,middleware)
const bodyParser = require("body-parser"); //middleware which process data send throught http request body
const route = require("./route/route"); //import route file to excute api's
const { default: mongoose } = require("mongoose"); //importing mongoose(object data modeling library)
const app = express();//assign express to variable

app.use(bodyParser.json());//transforms the text-based JSON input into JS-accessible variables

app.use(bodyParser.urlencoded({ extended: true })); //precises that the req.body object will contain values of any type instead of just strings.


mongoose
  .connect(
    "mongodb+srv://MiTesH:in856BpPgec4Dnff@cluster0.vpn59.mongodb.net/project-internshipGroup22?retryWrites=true&w=majority",
    {
    
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))//return fulfilled promise
  .catch((err) => console.log(err));//return rejected promise

app.use("/", route);//act as global middleware to excute


app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
