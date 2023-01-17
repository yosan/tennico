import { configureStore } from '@reduxjs/toolkit'
import HomeReducer from 'features/home/homeSlice'

export const store = configureStore({
  reducer: {
    home: HomeReducer,
  },
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
