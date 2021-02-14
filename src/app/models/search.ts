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
  createdAt: string
  nighter: boolean
  _geoloc: {
    lat: number
    lng: number
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
        geo: new firebase.firestore.GeoPoint(hit._geoloc.lat, hit._geoloc.lng),
        createdAt: firebase.firestore.Timestamp.fromDate(
          new Date(hit.createdAt)
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
        geo: new firebase.firestore.GeoPoint(hit._geoloc.lat, hit._geoloc.lng),
        createdAt: firebase.firestore.Timestamp.fromDate(
          new Date(hit.createdAt)
        ),
      },
    }
  })
  return courts
}
