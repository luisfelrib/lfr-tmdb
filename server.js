require('dotenv').config();
// require('./src/infrastructure/database');
const app = require('./src/infrastructure/express_server');

app.start();
