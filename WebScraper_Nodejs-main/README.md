# 📚 Web Scraper

A modular, configurable Node.js web scraper built to extract data from paginated websites like [Books to Scrape](https://books.toscrape.com). It features retry logic, JSON/CSV saving, notifications, and structured logging.

---

## 🚀 Features

- Scrape paginated product listings
- Save data in `.json`, `.csv`, or both
- Built-in retry with exponential backoff
- Configurable via `.env` file
- Notification system for status updates
- Structured logging for better debugging

---

## 🧰 Project Structure

```

src/
├── config/ # Environment-based configuration
│ └── default.js
├── scraper/ # Fetch and parse logic
│ ├── fetcher.js
│ ├── parser.js
│ └── pagination.js
├── storage/ # Output handlers
│ ├── csvWriter.js
│ └── jsonWriter.js
├── services/ # Notifications
│ └── notification.js
├── utils/ # Reusable utilities
│ ├── errorHandler.js
│ └── logger.js
├── index.js # Main entry point
└── .env # Runtime configuration

```

---

## 📦 Requirements

- Node.js v16+
- npm

---

## ⚙️ Configuration

Create a `.env` file in the `src/` directory:

```env
BASE_URL=https://books.toscrape.com
MAX_PAGES=3
PAGE_PARAM=catalogue/page-
RETRY_COUNT=3
RETRY_DELAY=1000
TIMEOUT=5000
SAVE_FORMAT=both
NOTIFICATIONS_ENABLED=true
```
