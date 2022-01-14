const Router = require('@koa/router')
const router = new Router()

const routes = require('require-all')({
  dirname: __dirname,
  filter: /^(?!index)(.+?)\.js$/
})

Object.keys(routes).forEach(key => {
  const route = routes[key]
  for (const method of ['get', 'post']) {
    if (!route[method]) return
    const path = route[method].path || route.path || '/' + key
    router[method](path, route[method])
  }
})

module.exports = router.routes.bind(router)
