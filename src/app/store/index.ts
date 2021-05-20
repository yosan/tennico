import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import HomeReducer from 'features/home/homeSlice'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    home: HomeReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        '@@reduxFirestore/LISTENER_RESPONSE',
        '@@reduxFirestore/UNSET_LISTENER',
      ],
    },
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
