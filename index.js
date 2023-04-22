const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("express").Router();
const taskInfo = require("./routes/taskInfo");

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send("Task Manager API");
});

routes.use("/tasks", taskInfo);

app.listen(3000, () => {
  console.log("Server is listening at port 3000");
});
