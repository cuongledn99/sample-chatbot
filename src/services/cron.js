var cron = require("node-cron");
var { getTaskByDeadline } = require('./queryDeadline')
var { notifyToUser } = require("services/notifyToMobile")
cron.schedule("* * * * *", async () => {
  let today = new Date();
  let tasks = await getTaskByDeadline(today, today, 3)
  await Promise.all(
    tasks.map(async item => {
      await Promise.all(
        item.tasks.map(async item => {
          let data = {
            id: item._id,
            text: item.title,
            type: "Todo"
          }
          await notifyToUser(data, item.title, item.assignTo, data)
        })
      )
    })
  )
});
