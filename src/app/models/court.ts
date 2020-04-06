import firebase from 'firebase/app'
import 'firebase/firestore'

export default interface Court {
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

export enum SurfaceType {
  omni = 'omni',
  clay = 'clay',
  hard = 'hard',
}

export const surfaceTypeName = (type: SurfaceType) => {
  switch (type) {
    case SurfaceType.omni:
      return 'オムニ'
    case SurfaceType.clay:
      return 'クレー'
    case SurfaceType.hard:
      return 'ハード'
    default:
      return ''
  }
}
