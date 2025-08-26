const notifier = require("node-notifier");
const logger = require("../utils/logger");

function notify(title, message) {
  notifier.notify(
    {
      title,
      message,
      sound: true,
      wait: false,
    },
    (err, response, metadata) => {
      if (err) {
        logger.error("Notification error:", err);
      }
    }
  );
}

module.exports = {
  notify,
};
