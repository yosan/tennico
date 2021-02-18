import algoliasearch from 'algoliasearch'
import * as functions from 'firebase-functions'

const client = algoliasearch(
  functions.config().algolia.app_id,
  functions.config().algolia.admin_key
)
const index = client.initIndex('courts')

const addToIndex = async (snapshot: FirebaseFirestore.DocumentSnapshot) => {
  const data = snapshot.data()

  if (!data) {
    throw new functions.https.HttpsError('internal', 'no data')
  }

  const object = {
    objectID: snapshot.id,
    address: data.address,
    _geoloc: {
      lat: data.geo._latitude,
      lng: data.geo._longitude,
    },
    name: data.name,
    nighter: data.nighter,
    price: data.price,
    surfaces: data.surfaces,
    url: data.url,
    createdAt: data.createdAt.toDate(),
  }
  try {
    return await index.saveObject(object)
  } catch (e) {
    functions.logger.error(e)
    throw new functions.https.HttpsError('internal', 'adding to index failed')
  }
}

export const courtCreated = functions.firestore
  .document('courts/{courtID}')
  .onCreate(async (snapshot) => {
    await addToIndex(snapshot)
  })

export const courtUpdated = functions.firestore
  .document('courts/{courtID}')
  .onUpdate(async (change) => {
    await addToIndex(change.after)
  })
