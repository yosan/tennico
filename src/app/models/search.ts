import algoliasearch from 'algoliasearch'
import { algolia } from 'config'
import Court, { SurfaceType } from 'models/court'

const client = algoliasearch(algolia.appId, algolia.apiKey)
const index = client.initIndex('courts')

interface CourtAlgolia {
  id: string
  name: string
  address: string
  price: string
  surfaces: { [type in SurfaceType]: number }
  createdAt: firebase.firestore.Timestamp
  nighter: boolean
  geo: {
    _latitude: number
    _longitude: number
  }
  url?: string
}

export const search = async (text: string, hitsPerPage: number) => {
  const result = await index.search<CourtAlgolia>(text, { hitsPerPage })
  const courts: Court[] = result.hits.map((hit) => {
    return {
      id: hit.objectID,
      ...hit,
      geo: {
        latitude: hit.geo._latitude,
        longitude: hit.geo._longitude,
      },
    }
  })
  return courts
}
