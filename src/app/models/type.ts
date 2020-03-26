import { FirebaseReducer } from 'react-redux-firebase'

export type State = {
  firebase: FirebaseReducer.Reducer<
    unknown,
    Record<string, Record<string | number, string | number>>
  >
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  firestore: any
}
