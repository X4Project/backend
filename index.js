const express = require("express");
const config = require('./config')
const app = express();

require('./startup/logging');
require('./startup/prod')(app);
require('./startup/routes')(app);

const port = config.PORT || 3000;

const server = app.listen(process.env.PORT || port, () => {
   console.log(`Listening on port ${port}`);
});

module.exports = server;