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

export const toCourt = (data: FirCourt): Court => {
  return {
    ...data,
    geo: {
      latitude: data.geo.latitude,
      longitude: data.geo.longitude,
    },
    createdAt: data.createdAt.toMillis(),
  }
}
