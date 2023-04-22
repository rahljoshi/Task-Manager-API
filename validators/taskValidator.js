class taskValidator {
  static validateTaskInfo(taskInfo, taskData) {
    if (
      taskInfo.hasOwnProperty("title") &&
      taskInfo.title.length > 0 &&
      taskInfo.hasOwnProperty("taskId") &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.description.length > 0 &&
      taskInfo.hasOwnProperty("flag") &&
      (taskInfo.flag === true || taskInfo.flag === false) &&
      this.validateUniqueTaskId(taskInfo, taskData)
    ) {
      return {
        status: true,
        message: "Task has been added",
      };
    }
    if (!this.validateUniqueTaskId(taskInfo, taskData)) {
      return {
        status: false,
        message: "Task id has to be unique",
      };
    }
    return {
      status: false,
      message: "Task Info is malformed please provide all the properties",
    };
  }

  static validateUniqueTaskId(taskInfo, taskData) {
    let valueFound = taskData.tasks.some((el) => el.taskId === taskInfo.taskId);
    if (valueFound) return false;
    return true;
  }

  static validateTaskInfoUpdate(taskInfo) {
    if (
      taskInfo.hasOwnProperty("title") &&
      taskInfo.title.length > 0 &&
      taskInfo.hasOwnProperty("description") &&
      taskInfo.description.length > 0 &&
      taskInfo.hasOwnProperty("flag") &&
      (taskInfo.flag === true || taskInfo.flag === false)
    ) {
      return {
        status: true,
        message: "Task has been updated",
      };
    }
    return {
      status: false,
      message: "Task Info is malformed please provide all the properties",
    };
  }
}

module.exports = taskValidator;
