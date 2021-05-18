import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['@@reduxFirestore/LISTENER_RESPONSE'],
    },
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
