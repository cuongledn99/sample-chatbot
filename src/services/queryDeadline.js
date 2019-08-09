var mongoose = require("mongoose");

module.exports = {
  getTaskByDeadline: async (startDate, endDate, deadline) => {
    let feature = new Date(startDate.toISOString()).setDate(new Date().getDate() + deadline)
    
    let pipline = [{
      $unwind: {
        path: "$tasks",
        preserveNullAndEmptyArrays: true
      }
    }, {
      $match: {
        startTime: {$lte: startDate},
        endTime: {$gte: endDate},
        "tasks.status": "Chưa hoàn tất",
        "tasks.deadline": { $gte: startDate},
      }
    }, {
      $match: {
        "tasks.deadline": {$lte: new Date(feature)},
      }
    }, {
      $group: {
        _id: "$_id",
        startTime: { $first: "$startTime" },
        endTime: { $first: "$endTime" },
        tasks: { $push: "$tasks" }
      }
    }];

    let tasks = await mongoose.model("todoList").aggregate(pipline);

    return tasks;
  },
};
