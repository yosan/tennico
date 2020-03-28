import * as React from 'react'
import { Provider } from 'react-redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase'
import * as Sentry from '@sentry/browser'
import 'firebase/analytics'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebase as fbConfig, reduxFirebase as rfConfig } from '../../config'
import { createStore, combineReducers } from 'redux'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'

const initialState = {}
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})
const store = createStore(rootReducer, initialState)

if (!firebase.apps.length) {
  firebase.initializeApp(fbConfig)
}
if (process.browser) {
  firebase.analytics()
  Sentry.init({
    dsn: 'https://3473ab51105642b2ba19963d2a00a738@sentry.io/1771548',
  })
}

const App: React.FC<{}> = ({ children }) => (
  <main>
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <div className="App">{children}</div>
      </ReactReduxFirebaseProvider>
    </Provider>
  </main>
)

export default App
