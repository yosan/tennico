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
  return {
    firebase: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? '',
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? '',
      messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
      storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? '',
    },
    algolia: {
      appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
      apiKey: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ?? '',
    },
    google: {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
      apiKeyGeo: process.env.NEXT_PUBLIC_GOOGLE_API_KEY_GEO ?? '',
    },
  }
}
