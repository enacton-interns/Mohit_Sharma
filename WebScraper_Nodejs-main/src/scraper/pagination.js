// scraper/pagination.js
const config = require("../config/default");

function getPageList() {
  const pages = [];

  for (let i = 1; i <= config.pagination.maxPages; i++) {
    const pagePath = `${config.pagination.pageParam}${i}.html`;
    pages.push(pagePath);
  }

  return pages;
}

module.exports = { getPageList };
