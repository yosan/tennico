import 'firebase/firestore'

import firebase from 'firebase/app'

import { SurfaceType } from './surfaceType'

export interface Court {
  id: string
  address: string
  price: string
  nighter: boolean
  surfaces: { [type in SurfaceType]?: number }
  name: string
  createdAt: firebase.firestore.Timestamp
  geo: firebase.firestore.GeoPoint
  url?: string
}
