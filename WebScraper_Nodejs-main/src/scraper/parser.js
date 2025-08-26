const cheerio = require("cheerio");
const config = require("../config/default");
const logger = require("../utils/logger");

function parseItems(html) {
  const $ = cheerio.load(html);
  const items = [];

  $(config.selectors.itemList).each((_, el) => {
    const $el = $(el);

    const title = $el.find(config.selectors.title).text().trim();
    const price = $el.find(config.selectors.price).text().trim();
    const relativeLink = $el.find(config.selectors.link).attr("href");

    const absoluteLink = relativeLink
      ? new URL(relativeLink, config.baseURL).href
      : null;

    items.push({
      title,
      price,
      link: absoluteLink,
    });
  });

  logger.log(`Parsed ${items.length} items`);
  return items;
}

module.exports = { parseItems };
