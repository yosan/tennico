interface Config {
  firebase: {
    apiKey: string
    appId: string
    authDomain: string
    databaseURL: string
    measurementId: string
    messagingSenderId: string
    projectId: string
    storageBucket: string
  }
  algolia: {
    appId: string
    apiKey: string
  }
  google: {
    apiKey: string
    apiKeyGeo: string
  }
}

export const getConfig = (): Config => {
  const isTest = process.env.NODE_ENV === 'test'
  const json = isTest ? require('./config-test.json') : require('./config.json')
  return {
    firebase: json.firebase,
    algolia: json.algolia,
    google: json.google,
  }
}
