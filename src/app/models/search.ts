import algoliasearch from 'algoliasearch'
import { algolia } from 'config'
import { Court } from 'models/court'

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
): Promise<Court[]> => {
  const result = await index.search<CourtAlgolia>(text, { hitsPerPage })
  const courts: Court[] = result.hits.map((hit) => {
    return {
      id: hit.objectID,
      ...hit,
      geo: {
        latitude: hit.geo._latitude,
        longitude: hit.geo._longitude,
      },
      createdAt: hit.createdAt._seconds,
    }
  })
  return courts
}

export const searchByGeo = async (
  lat: number,
  lng: number,
  hitsPerPage: number
): Promise<Court[]> => {
  const result = await index.search<CourtAlgolia>('', {
    hitsPerPage,
    aroundLatLng: `${lat}, ${lng}`,
  })
  const courts: Court[] = result.hits.map((hit) => {
    return {
      id: hit.objectID,
      ...hit,
      geo: {
        latitude: hit.geo._latitude,
        longitude: hit.geo._longitude,
      },
      createdAt: hit.createdAt._seconds,
    }
  })
  return courts
}
