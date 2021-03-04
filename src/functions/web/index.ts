import * as functions from 'firebase-functions'
import next from 'next'
import url from 'url'

const app = next({
  dev: false,
  dir: __dirname,
  conf: {
    distDir: '../next',
  },
})
const handle = app.getRequestHandler()

const botUserAgents = [
  'bingbot',
  'facebookexternalhit',
  'googlebot',
  'Slackbot',
  'Twitterbot',
]
const botUaPattern = new RegExp(botUserAgents.join('|'), 'i')

const isBot = (req: functions.https.Request): boolean => {
  const ua = req.headers['user-agent']
  return ua !== undefined && botUaPattern.test(ua)
}

const generateUrl = (req: functions.https.Request): string => {
  return url.format({
    protocol: 'https',
    host: functions.config().rendertron?.app_host ?? '',
    pathname: req.originalUrl,
  })
}

export const nextApp = functions.https.onRequest(async (req, res) => {
  if (isBot(req) && req.path !== '/api/sitemap.xml') {
    const renderResp = await fetch(
      `https://${
        functions.config().rendertron?.rendertron_host ?? ''
      }/render/${generateUrl(req)}`
    )
    const body = await renderResp.text()

    res.set('Cache-Control', 'public, max-age=300, s-maxage=600')
    res.set('Vary', 'User-Agent')
    res.send(body.toString())
  } else {
    app.prepare().then(() => handle(req, res))
  }
})
