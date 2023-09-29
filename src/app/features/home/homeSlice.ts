import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CourtDoc } from 'models/court'
import { search, searchByGeo as _searchByGeo } from 'models/search'
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
  courts?: CourtDoc[]
  selectedCourtID?: string
}

const initialState: HomeState = {
  mode: 'text',
  zoom: 11,
  center: { lat: 35.681236, lng: 139.767125 },
}

export const searchByText = createAsyncThunk(
  'home/searchByText',
  async (params: { text: string; hits: number }) => {
    const courtDocs = await search(params.text, params.hits)
    return courtDocs
  },
)

export const searchByGeo = createAsyncThunk(
  'home/searchByGeo',
  async (params: { lat: number; lng: number; hits: number }) => {
    const courtDocs = await _searchByGeo(params.lat, params.lng, params.hits)
    return courtDocs
  },
)

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
    changeSelectedCourtID: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.selectedCourtID = action.payload
    },
  },
  extraReducers: {
    [searchByText.fulfilled.type]: (
      state,
      action: PayloadAction<CourtDoc[]>,
    ) => {
      state.courts = action.payload
    },
    [searchByGeo.fulfilled.type]: (
      state,
      action: PayloadAction<CourtDoc[]>,
    ) => {
      state.courts = action.payload
    },
  },
})

export const { changeMode, changeZoom, changeCenter, changeSelectedCourtID } =
  homeSlice.actions

export const selectMode = (state: RootState): Mode => state.home.mode
export const selectZoom = (state: RootState): number => state.home.zoom
export const selectCenter = (state: RootState): Geo => state.home.center
export const selectCourtDocs = (state: RootState): CourtDoc[] | undefined =>
  state.home.courts
export const selectSelectedCourtID = (state: RootState): string | undefined =>
  state.home.selectedCourtID

export default homeSlice.reducer
