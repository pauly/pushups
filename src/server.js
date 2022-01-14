const Koa = require('koa')
const koaBodyParser = require('koa-bodyparser')
const koaConditionalGet = require('koa-conditional-get')
const koaEtag = require('koa-etag')
const koaCompress = require('koa-compress')
const log = require('./lib/log')
const truncate = require('./lib/truncate')
const { config } = require('../package')
const routes = require('./routes')

const app = new Koa()

app.use(koaCompress({
  filter (contentType) {
    return /text/i.test(contentType)
  },
  threshold: 2048,
  gzip: {
    flush: require('zlib').Z_SYNC_FLUSH
  },
  deflate: {
    flush: require('zlib').Z_SYNC_FLUSH
  },
  br: false // disable brotli
}))

app.use(koaConditionalGet())

app.use(koaEtag())

const headers = {
  // 'Content-Security-Policy': "script-src 'self' 'unsafe-inline'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-UA-Compatible': 'IE=edge'
}

app.use(koaBodyParser())

app.keys = [config.secret]

app.use(async (ctx, next) => {
  ctx.set(headers)
  const start = Date.now()
  await next()
  const rt = `${Date.now() - start}ms`
  const user = (ctx.state && ctx.state.user && ctx.state.user.id) || '-'
  log(ctx.method, truncate(ctx.url), ctx.response.status, rt, user || '-')
})

app.use(routes())

app.use((ctx, next) => {
  if (ctx.body) {
    ctx.body += `
<script>location.href=location.pathname.replace(/\\//, '/#')</script>
<noscript><a href="/">help it has all gone wrong</a></noscript>`
  }
  next()
})

app.listen(config.port)
