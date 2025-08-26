const axios = require("axios");
const config = require("../config/default");
const logger = require("../utils/logger");

const instance = axios.create({
  baseURL: config.baseURL,
  timeout: config.fetchOptions.timeout,
  headers: config.fetchOptions.headers,
});

async function fetchPage(pathOrUrl) {
  if (!config.baseURL) {
    throw new Error(
      "BASE_URL is not defined. Ensure it's set in your .env file and that you're running the script from the project root."
    );
  }

  const url = pathOrUrl.startsWith("http")
    ? pathOrUrl
    : new URL(pathOrUrl, config.baseURL).href;

  try {
    const resp = await instance.get(url);
    logger.log(`Fetched: ${url}`);
    return resp.data;
  } catch (err) {
    logger.error(`Fetch failed for ${url}`);
    logger.error(err.stack || err.message);
    throw err; // Re-throw the error to be handled by the retry logic
  }
}

module.exports = { fetchPage };
