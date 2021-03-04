const config = {
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? 'xxx',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? 'xxx',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? 'xxx',
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? 'xxx',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? 'xxx',
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? 'xxx',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? 'xxx',
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? 'xxx',
  },
  algolia: {
    appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? 'xxx',
    apiKey: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ?? 'xxx',
  },
  google: {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? 'xxx',
    apiKeyGeo: process.env.NEXT_PUBLIC_GOOGLE_API_KEY_GEO ?? 'xxx',
  },
  sentry: {
    dns: process.env.NEXT_PUBLIC_SENTRY_DNS ?? 'xxx',
  },
}

export default config
