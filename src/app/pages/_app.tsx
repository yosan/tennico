import './styles.css'

import { orange, teal } from '@material-ui/core/colors'
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles'
import * as Sentry from '@sentry/browser'
import config from 'config'
import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from 'store'
import { getApps, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const theme = createTheme({
  palette: {
    background: {
      default: `linear-gradient(180deg, ${teal[800]} 0%, ${teal[800]} 300px, #FFFFFF 300px, #FFFFFF 100%)`,
    },
    primary: {
      light: teal[500],
      main: teal[800],
      dark: teal[900],
      contrastText: 'white',
    },
    secondary: {
      light: orange[500],
      main: orange[700],
      dark: orange[900],
      contrastText: 'white',
    },
  },
  typography: {
    fontSize: 14,
    h1: {
      fontSize: 24,
      '@media (min-width:600px)': {
        fontSize: 32,
      },
    },
  },
})

if (getApps().length === 0) {
  initializeApp(config.firebase)
}
if (process.browser) {
  getAnalytics()
  Sentry.init({
    dsn: config.sentry.dns,
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
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Component {...pageProps} />
          </div>
        </MuiThemeProvider>
      </Provider>
    </>
  )
}

export default App
