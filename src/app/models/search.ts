import 'firebase/firestore'

import algoliasearch from 'algoliasearch'
import { algolia } from 'config'
import firebase from 'firebase/app'
import { CourtDoc } from 'models/court'

import { SurfaceType } from './surfaceType'

const client = algoliasearch(algolia.appId, algolia.apiKey)
const index = client.initIndex('courts')
index.setSettings({
  searchableAttributes: ['name', 'address'],
})

interface CourtAlgolia {
  id: string
  name: string
  address: string
  price: string
  surfaces: { [type in SurfaceType]: number }
  createdAt: {
    _seconds: number
    _nanoseconds: number
  }
  nighter: boolean
  geo: {
    _latitude: number
    _longitude: number
  }
  url?: string
}

export const search = async (
  text: string,
  hitsPerPage: number
): Promise<CourtDoc[]> => {
  const result = await index.search<CourtAlgolia>(text, { hitsPerPage })
  const courts: CourtDoc[] = result.hits.map((hit) => {
    return {
      id: hit.objectID,
      data: {
        ...hit,
        geo: new firebase.firestore.GeoPoint(
          hit.geo._latitude,
          hit.geo._longitude
        ),
        createdAt: new firebase.firestore.Timestamp(
          hit.createdAt._seconds,
          hit.createdAt._nanoseconds
        ),
      },
    }
  })
  return courts
}

export const searchByGeo = async (
  lat: number,
  lng: number,
  hitsPerPage: number
): Promise<CourtDoc[]> => {
  const result = await index.search<CourtAlgolia>('', {
    hitsPerPage,
    aroundLatLng: `${lat}, ${lng}`,
  })
  const courts: CourtDoc[] = result.hits.map((hit) => {
    return {
      id: hit.objectID,
      data: {
        ...hit,
        geo: new firebase.firestore.GeoPoint(
          hit.geo._latitude,
          hit.geo._longitude
        ),
        createdAt: new firebase.firestore.Timestamp(
          hit.createdAt._seconds,
          hit.createdAt._nanoseconds
        ),
      },
    }
  })
  return courts
}
