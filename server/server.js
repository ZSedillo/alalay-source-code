const { fetchAndLogTempDocs } = require('./controllers/tempController');

(async () => {
    await fetchAndLogTempDocs();
    process.exit(); // Exit script after run
})();
