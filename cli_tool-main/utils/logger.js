module.exports = {
  error: (msg) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`),
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
};
