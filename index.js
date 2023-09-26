import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const today = new Date();
let date = today.getDate(); 
let month = today.getMonth();
let year = today.getFullYear();

var homeList = [];
var workList = [];

function checkDate(req, res, next){

  const current = new Date();
  let currentDate = current.getDate();

  if(currentDate !== date){
    homeList = [];
    workList = [];
    date = current.getDate();
    month = current.getMonth();
    year = current.getFullYear();
  }

  next();
}

app.use(checkDate);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/home", (req, res) => {
  res.render("home.ejs", {date, month, year, listItems1: homeList});
});

app.get("/work", (req, res) => {
  res.render("work.ejs", {date, month, year, listItems2: workList});
});

app.post("/adder", (req, res, next) => {
  var key = Object.keys(req.body)[0];
  console.log("key = "+ key);
  var ItemToBeAdded = req.body[key];
  console.log("ItemToBeAdded = " + ItemToBeAdded);
  if (key == "new_content") {
    console.log("In work");
    workList.push(ItemToBeAdded);
    res.redirect("/work");
    next();
  } else {
    console.log("In Home");
    homeList.push(ItemToBeAdded);
    res.redirect("/home");
    next();
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


