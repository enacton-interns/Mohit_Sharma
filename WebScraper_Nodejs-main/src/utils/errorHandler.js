const logger = require("./logger");

async function tryWithRetry(fn, retries = 3, label = "Task") {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const result = await fn();
      return result;
    } catch (err) {
      attempt++;
      if (attempt > retries) {
        logger.error(`${label} failed after ${retries} retries.`);
        logger.error(err.stack || err.message);
        throw err;
      } else {
        logger.warn(`${label} failed (attempt ${attempt}), retrying…`);
        await new Promise((res) => setTimeout(res, 1000 * attempt));
      }
    }
  }
}

module.exports = {
  tryWithRetry,
};
