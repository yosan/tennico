import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'
import './styles.css'

import { pink, teal } from '@material-ui/core/colors'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import * as Sentry from '@sentry/browser'
import config from 'config'
import firebase from 'firebase/app'
import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { store } from 'store'

const theme = createMuiTheme({
  palette: {
    background: {
      default:
        'linear-gradient(180deg, #009688 0%, #009688 300px, #FFFFFF 300px, #FFFFFF 100%)',
    },
    primary: teal,
    secondary: pink,
  },
  typography: {
    fontSize: 12,
  },
})

if (!firebase.apps.length) {
  firebase.initializeApp(config.firebase)
}
if (process.browser) {
  firebase.analytics()
  Sentry.init({
    dsn: config.sentry.dns,
  })
}

const rfConfig = {
  useFirestoreForProfile: false,
  enableLogging: false,
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
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
              <Component {...pageProps} />
            </div>
          </MuiThemeProvider>
        </ReactReduxFirebaseProvider>
      </Provider>
    </>
  )
}

export default App
