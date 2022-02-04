const express = require('express');
// const YAML = require('yamljs');
// const swaggerUi = require('swagger-ui-express');

// const swaggerDocument = YAML.load('api_doc.yaml');

const app = express();
app.use(express.json());
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoints
require('../port/rest_apis/express_apis')(app);

const start = () => {
  app.listen(process.env.SERVER_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`REST server running on port ${process.env.SERVER_PORT}...`);
  });
};

module.exports = { start };
