
var path = require('path');
// setup the default winston logger
const winston = require('winston');
require('winston-syslog').Syslog;
process.title = 'mean';

// create logger instance
var myLogger = new winston.Logger({
  level: 'debug',
  transports: [
    new (winston.transports.Syslog)(),
    new (winston.transports.Console)({timestamp: true, colorize: true, label: " mylabel"}),
    new (winston.transports.File)({filename: 'log/mean.log', json: false})
  ]
});


module.exports = myLogger;