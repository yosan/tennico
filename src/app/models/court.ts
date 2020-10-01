import { SurfaceType } from './surfaceType'

export interface Court {
  id: string
  address: string
  price: string
  nighter: boolean
  surfaces: { [type in SurfaceType]?: number }
  name: string
  createdAt: number
  geo: {
    latitude: number
    longitude: number
  }
  url?: string
}
