const taskRoutes = require("express").Router();
const taskData = require("../task.json");
const validator = require("../validators/taskValidator");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.get("/", (req, res) => {
  res.status(200).send(taskData);
});

taskRoutes.post("/", (req, res) => {
  const taskDetails = req.body;
  let writePath = path.join(__dirname, "..", "task.json");

  if (validator.validateTaskInfo(taskDetails, taskData).status) {
    let taskDataModified = JSON.parse(JSON.stringify(taskData));
    taskDataModified.tasks.push(taskDetails);
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).json(validator.validateTaskInfo(taskDetails, taskData));
  } else {
    res.status(400);
    res.json(validator.validateTaskInfo(taskDetails, taskData));
  }
});

taskRoutes.get("/:taskId", (req, res) => {
  let task = taskData.tasks;
  let taskIdPassed = req.params.taskId;
  let result = task.filter((val) => val.taskId == taskIdPassed);
  if (result.length === 0) {
    res.status(400).send("Enter a valid id");
  } else {
    res.status(200).json(result);
  }
});

taskRoutes.delete("/:taskId", (req, res) => {
  let taskDataModified = JSON.parse(JSON.stringify(taskData));
  let taskIdPassed = req.params.taskId;
  let taskIndex = taskDataModified.tasks.findIndex(
    (val) => val.taskId == taskIdPassed
  );
  if (taskIndex === -1) {
    res.status(400).send("Enter a valid id");
  } else {
    taskDataModified.tasks.splice(taskIndex, 1);
    let writePath = path.join(__dirname, "..", "task.json");
    fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {
      encoding: "utf-8",
      flag: "w",
    });

    res.status(200).send("file deleted");
  }
});

taskRoutes.put("/:taskId", (req, res) => {
  const taskDetails = req.body;
  let taskDataModified = JSON.parse(JSON.stringify(taskData));
  let taskIdPassed = req.params.taskId;
  let taskIndex = taskDataModified.tasks.findIndex(
    (val) => val.taskId == taskIdPassed
  );
  if (taskIndex === -1) {
    res.status(400).send("Enter a valid id");
  } else {
    if (validator.validateTaskInfoUpdate(taskDetails).status) {
      // taskDataModified.tasks.splice(taskIndex, 1);
      taskDataModified.tasks[taskIndex].description = taskDetails.description;
      taskDataModified.tasks[taskIndex].title = taskDetails.title;
      taskDataModified.tasks[taskIndex].flag = taskDetails.flag;

      let writePath = path.join(__dirname, "..", "task.json");
      fs.writeFileSync(writePath, JSON.stringify(taskDataModified), {
        encoding: "utf-8",
        flag: "w",
      });
      res.status(200).json(validator.validateTaskInfoUpdate(taskDetails));
    } else {
      res.status(400);
      res.json(validator.validateTaskInfoUpdate(taskDetails));
    }
  }
});

module.exports = taskRoutes;
