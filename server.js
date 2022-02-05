const path = process.env.NODE_ENV ? `.env_${process.env.NODE_ENV}.env` : '.env_prod.env';
require('dotenv').config({ path });
// require('./src/infrastructure/database');
const { startServer } = require('./src/infrastructure/express_server');

startServer();
