import algoliasearch from 'algoliasearch'
import * as functions from 'firebase-functions'
import next from 'next'

import { algolia } from './config'

// const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev: false,
  dir: __dirname,
  conf: {
    distDir: 'next',
  },
})
const handle = app.getRequestHandler()

export const nextApp = functions.https.onRequest((req, res) => {
  console.log('File: ' + req.originalUrl)
  return app.prepare().then(() => handle(req, res))
})

const client = algoliasearch(algolia.appId, algolia.adminKey)
const index = client.initIndex('courts')

const addToIndex = async (snapshot: FirebaseFirestore.DocumentSnapshot) => {
  const object = {
    objectID: snapshot.id,
    ...snapshot.data(),
  }
  try {
    return await index.saveObject(object)
  } catch (e) {
    console.error(e)
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
