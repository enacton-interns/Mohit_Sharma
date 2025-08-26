module.exports = {
  baseURL: process.env.BASE_URL,
  pagination: {
    enabled: true,
    maxPages: parseInt(process.env.MAX_PAGES || "1", 10),
    pageParam: process.env.PAGE_PARAM || "page-",
    pageSuffix: process.env.PAGE_SUFFIX || ".html",
  },
  fetchOptions: {
    timeout: parseInt(process.env.TIMEOUT || "5000", 10),
    retry: {
      retries: parseInt(process.env.RETRY_COUNT || "3", 10),
      factor: 2,
      minTimeout: parseInt(process.env.RETRY_DELAY || "1000", 10),
    },
    headers: {
      "User-Agent": "Mozilla/5.0 (Web Scraper Bot)",
    },
  },
  selectors: {
    itemList: "article.product_pod",
    title: "h3 > a",
    price: ".price_color",
    link: "h3 > a",
  },
  saveFormat: process.env.SAVE_FORMAT || "json",
  notificationsEnabled: process.env.NOTIFICATIONS_ENABLED === "true",
  output: {
    json: "output/data.json",
    csv: "output/data.csv",
  },
};
