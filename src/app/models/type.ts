import 'react-redux'

import { FirebaseReducer, FirestoreReducer } from 'react-redux-firebase'

export interface State {
  firebase: FirebaseReducer.Reducer<
    unknown,
    Record<string, Record<string | number, string | number>>
  >
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firestore: FirestoreReducer.Reducer
}

declare module 'react-redux' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultRootState extends State {}
}

declare global {
  interface Window {
    google: {
      maps: {
        LatLngBounds: () => void
      }
    }
  }
}
