import algoliasearch from 'algoliasearch'
import * as functions from 'firebase-functions'
import next from 'next'
import url from 'url'

const app = next({
  dev: false,
  dir: __dirname,
  conf: {
    distDir: 'next',
  },
})
const handle = app.getRequestHandler()

export const botUserAgents = [
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
    host: functions.config().rendertron.app_host,
    pathname: req.originalUrl,
  })
}

export const nextApp = functions.https.onRequest(async (req, res) => {
  if (isBot(req) && req.path !== '/api/sitemap.xml') {
    const renderResp = await fetch(
      `https://${
        functions.config().rendertron.rendertron_host
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

const client = algoliasearch(
  functions.config().algolia.app_id,
  functions.config().algolia.admin_key
)
const index = client.initIndex('courts')

const addToIndex = async (snapshot: FirebaseFirestore.DocumentSnapshot) => {
  const data = snapshot.data()

  const object = {
    objectID: snapshot.id,
    _geoloc: {
      lat: data?.geo._latitude,
      lng: data?.geo._longitude,
    },
    ...data,
  }
  try {
    return await index.saveObject(object)
  } catch (e) {
    functions.logger.error(e)
    throw new functions.https.HttpsError('internal', 'adding to index failed')
  }
}

exports.courtCreated = functions.firestore
  .document('courts/{courtID}')
  .onCreate(async (snapshot) => {
    await addToIndex(snapshot)
  })

exports.courtUpdated = functions.firestore
  .document('courts/{courtID}')
  .onUpdate(async (change) => {
    await addToIndex(change.after)
  })
