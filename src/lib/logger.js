const winston = require('winston')
const path = require('path')
const { name } = require('../../package')
const filename = path.resolve(process.env.HOME, name + '.log')

module.exports = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename })
  ]
})
