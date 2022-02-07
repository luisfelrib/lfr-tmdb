const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json({ extended: false }));
app.use(express.static('build'));
app.use(cors());
app.use(express.json());

// Endpoints
require('../port/rest_apis/express_apis')(app);

// Application
app.get('*', async (request, response) => {
  try {
    return response.sendFile(path.join(__dirname, '../../build', 'index.html'));
  } catch (err) {
    if (err.syscall === 'lstat') {
      return response.status(404).send();
    }
    return response.status(500).send();
  }
});
const startServer = () => {
  app.listen(process.env.SERVER_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`REST server running on port ${process.env.SERVER_PORT}...`);
  });
};

module.exports = { app, startServer };
