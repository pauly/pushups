const data = require('../lib/data')

module.exports = {
  path: '/',
  get: async (ctx, next) => {
    ctx.body = { data }
  }
}
