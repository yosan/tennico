import algoliasearch from 'algoliasearch'
import config from 'config'
import { CourtDoc } from 'models/court'
import { SurfaceType } from './surfaceType'

interface CourtAlgolia {
  id: string
  name: string
  prefecture: string
  city: string
  line: string
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

const getIndex = async () => {
  const client = algoliasearch(config.algolia.appId, config.algolia.apiKey)
  const index = client.initIndex('courts')
  return index
}

export const search = async (
  text: string,
  hitsPerPage: number
): Promise<CourtDoc[]> => {
  const index = await getIndex()
  const result = await index.search<CourtAlgolia>(text, { hitsPerPage })
  const courts: CourtDoc[] = result.hits.map((hit) => {
    return {
      id: hit.objectID,
      data: {
        ...hit,
        geo: { latitude: hit._geoloc.lat, longitude: hit._geoloc.lng },
        createdAt: new Date(hit.createdAt).getUTCMilliseconds(),
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
  const index = await getIndex()
  const result = await index.search<CourtAlgolia>('', {
    hitsPerPage,
    aroundLatLng: `${lat}, ${lng}`,
  })
  const courts: CourtDoc[] = result.hits.map((hit) => {
    return {
      id: hit.objectID,
      data: {
        ...hit,
        geo: { latitude: hit._geoloc.lat, longitude: hit._geoloc.lng },
        createdAt: new Date(hit.createdAt).getUTCMilliseconds(),
      },
    }
  })
  return courts
}
