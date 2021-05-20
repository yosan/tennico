import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store'

type Mode = 'text' | 'location'
type Geo = {
  lat: number
  lng: number
}

interface HomeState {
  mode: Mode
  zoom: number
  center: Geo
}

const initialState: HomeState = {
  mode: 'text',
  zoom: 11,
  center: { lat: 35.681236, lng: 139.767125 },
}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeMode: (state, action: PayloadAction<Mode>) => {
      state.mode = action.payload
    },
    changeZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload
    },
    changeCenter: (state, action: PayloadAction<Geo>) => {
      state.center = action.payload
    },
  },
})

export const { changeMode, changeZoom, changeCenter } = homeSlice.actions

export const selectMode = (state: RootState): Mode => state.home.mode
export const selectZoom = (state: RootState): number => state.home.zoom
export const selectCenter = (state: RootState): Geo => state.home.center

export default homeSlice.reducer
