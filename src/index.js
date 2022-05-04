const express = require("express"); //1
const bodyParser = require("body-parser"); //2
const route = require("./route/route"); //3
const { default: mongoose } = require("mongoose"); //4
const app = express();

app.use(bodyParser.json()); //5
app.use(bodyParser.urlencoded({ extended: true })); //6

mongoose
  .connect(
    "mongodb+srv://MiTesH:in856BpPgec4Dnff@cluster0.vpn59.mongodb.net/project-internshipGroup22?retryWrites=true&w=majority",
    {
      //11-15
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
