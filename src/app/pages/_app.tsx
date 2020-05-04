import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import './styles.css'

import * as Sentry from '@sentry/browser'
import { firebase as fbConfig, reduxFirebase as rfConfig } from 'config'
import firebase from 'firebase/app'
import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import * as React from 'react'
import { Provider } from 'react-redux'
import {
  firebaseReducer,
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase'
import { combineReducers, createStore } from 'redux'
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

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => (
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rfConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}
    >
      <div className="App">
        <Component {...pageProps} />
      </div>
    </ReactReduxFirebaseProvider>
  </Provider>
)

export default App
