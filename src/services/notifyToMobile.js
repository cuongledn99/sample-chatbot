var axios = require("axios");
var { notifyKey, appId } = require("../config");
module.exports = {
  notifyAll: (data, text) => {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios({
          url: "https://onesignal.com/api/v1/notifications",
          method: "POST",
          headers: {
            authorization: notifyKey,
          },
          data: {
            app_id: appId,
            included_segments: ["All"],
            data,
            contents: {
              en: text,
            },
          },
        });
        resolve(res);
      } catch (err) {
        console.log("err");
        reject(err);
      }
    });
  },
  notifyToWard: (data, text, wardId, other = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios({
          url: "https://onesignal.com/api/v1/notifications",
          method: "POST",
          headers: {
            authorization: notifyKey,
          },
          data: {
            app_id: appId,
            included_segments: ["All"],
            data,
            filters: [
              {
                field: "tag",
                key: "key",
                relation: "=",
                value: wardId,
              },
            ],
            contents: {
              en: text,
              ...other
            },
          },
        });
        resolve(res);
      } catch (err) {
        console.log("err");
        reject(err);
      }
    });
  },
  notifyToUser: (data, text, userId, other) => {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await axios({
          url: "https://onesignal.com/api/v1/notifications",
          method: "POST",
          headers: {
            authorization: notifyKey,
          },
          data: {
            app_id: appId,
            included_segments: ["All"],
            data,
            filters: [
              {
                field: "tag",
                key: "id",
                relation: "=",
                value: userId,
              },
            ],
            contents: {
              en: text,
              ...other
              // type: "News"|| "Todo",
              // id: taskId || newId
            },
          },
        });
        resolve(res);
      } catch (err) {
        console.log("err");
        reject(err);
      }
    });
  },
};
