// const { fetchAndLogTempDocs } = require('./controllers/tempController');

// (async () => {
//     await fetchAndLogTempDocs();
//     process.exit(); // Exit script after run
// })();
const connectDB = require('./config/db');
connectDB();