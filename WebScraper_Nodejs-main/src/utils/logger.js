function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[LOG ${timestamp}] ${message}`);
}

function warn(message) {
  const timestamp = new Date().toISOString();
  console.warn(`[WARN ${timestamp}] ${message}`);
}

function error(message) {
  const timestamp = new Date().toISOString();
  console.error(`[ERROR ${timestamp}] ${message}`);
}

module.exports = {
  log,
  warn,
  error,
};
