require("dotenv").config();

const { fetchPage } = require("./scraper/fetcher");
const { parseItems } = require("./scraper/parser");
const { getPageList } = require("./scraper/pagination");
const { writeJson } = require("./storage/jsonWriter");
const { writeCsv } = require("./storage/csvWriter");
const { tryWithRetry } = require("./utils/errorHandler");
const config = require("./config/default");
const logger = require("./utils/logger");

(async () => {
  const allItems = [];
  const pages = getPageList();

  logger.log(`Starting scraping of ${pages.length} pages`);

  for (const path of pages) {
    try {
      const items = await tryWithRetry(
        async () => {
          const html = await fetchPage(path);
          return parseItems(html);
        },
        config.fetchOptions.retry.retries, // Use config for retries
        `Scrape: ${path}`
      );

      allItems.push(...items);
    } catch (err) {
      logger.error(`Skipping page due to failure: ${path}`);
      if (config.notificationsEnabled) {
        notify("Scrape Warning", `Failed to scrape page: ${path}`);
      }
    }
  }

  if (allItems.length > 0) {
    if (config.saveFormat === "json" || config.saveFormat === "both") {
      await writeJson(allItems);
    }
    if (config.saveFormat === "csv" || config.saveFormat === "both") {
      await writeCsv(allItems);
    }
  }

  logger.log(`Scraping complete. Total items: ${allItems.length}`);

  if (config.notificationsEnabled) {
    notify("Scrape Complete", `Scraped ${allItems.length} items`);
  }
})();
