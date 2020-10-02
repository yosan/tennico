import 'firebase/firestore'

import firebase from 'firebase/app'

import { Court } from './court'
import { SurfaceType } from './surfaceType'

export interface FirCourt {
  id: string
  name: string
  address: string
  price: string
  surfaces: { [type in SurfaceType]: number }
  createdAt: firebase.firestore.Timestamp
  nighter: boolean
  geo: {
    latitude: number
    longitude: number
  }
  url?: string
}

export interface FirtCourtAPI {
  name: string
  fields: {
    price: {
      stringValue: string
    }
    createdAt: { timestampValue: string }
    nighter: { booleanValue: string }
    url: {
      stringValue: string
    }
    geo: { geoPointValue: { latitude: string; longitude: string } }
    address: { stringValue: string }
    name: { stringValue: string }
    surfaces: {
      mapValue: { fields: { [key in SurfaceType]?: { integerValue: string } } }
    }
  }
  createTime: string
  updateTime: string
}

export const toCourt = (data: FirtCourtAPI): Court => {
  const path = data.name.split('/')
  const surfaceFields = data.fields.surfaces.mapValue.fields

  const surfaces: { [type in SurfaceType]?: number } = {}
  Object.keys(surfaceFields).forEach((key) => {
    surfaces[key] = parseInt(surfaceFields[key].integerValue)
  })
  return {
    id: path[path.length - 1],
    address: data.fields.address.stringValue,
    price: data.fields.price.stringValue,
    nighter: data.fields.nighter.booleanValue === 'true',
    surfaces,
    name: data.fields.name.stringValue,
    createdAt: parseInt(data.fields.createdAt.timestampValue),
    geo: {
      latitude: parseFloat(data.fields.geo.geoPointValue.latitude),
      longitude: parseFloat(data.fields.geo.geoPointValue.longitude),
    },
    url: data.fields.url.stringValue,
  }
}
