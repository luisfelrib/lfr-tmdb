const path = process.env.NODE_ENV === 'dev' ? '.env.dev.env' : '.env';
require('dotenv').config({ path });
require('./src/infrastructure/database').initDatabase();
const { startServer } = require('./src/infrastructure/express_server');

startServer();
