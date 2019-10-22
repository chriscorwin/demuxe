const path = require('path');

const demoFlows = [];

require("fs").readdirSync(path.join(__dirname)).forEach((file) => file !== '.DS_Store' && demoFlows.push(require(path.join(__dirname, file))));

module.exports = demoFlows;
