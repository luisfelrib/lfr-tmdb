require('dotenv').config({ path: `.env_${process.env.NODE_ENV}.env` });
// require('./src/infrastructure/database');
const { startServer } = require('./src/infrastructure/express_server');

startServer();
