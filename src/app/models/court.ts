import { SurfaceType } from './surfaceType'

export interface CourtDoc {
  id: string
  data: Court
}

export interface Court {
  prefecture: string
  city: string
  line: string
  price: string
  nighter: boolean
  surfaces: { [type in SurfaceType]?: number }
  name: string
  createdAt: number
  geo: { latitude: number; longitude: number }
  url?: string
}
