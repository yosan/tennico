import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import './styles.css'

import * as Sentry from '@sentry/browser'
import { firebase as fbConfig, reduxFirebase as rfConfig } from 'config'
import firebase from 'firebase/app'
import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { Provider } from 'react-redux'
import {
  firebaseReducer,
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase'
import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore'

const initialState = {}
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})
const store = createStore(rootReducer, initialState, devToolsEnhancer({}))

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
}) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
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
    </>
  )
}

export default App
