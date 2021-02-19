# Tennico

The application to find tennis court

# Architecture

Next.js + Typescript + Firebase

using [react-redux-firebase](https://github.com/prescottprue/react-redux-firebase)


# Setup

## 1. Add .firebaserc

```json
{
  "projects": {
    "default": "<YOUR PROJECT ID>"
  }
}
```

## 2. Add src/app/config.ts

```typescript
export const firebase = {
  apiKey: 'xxx',
  appId: 'xxx',
  authDomain: 'xxx',
  databaseURL: 'xxx',
  measurementId: 'xxx',
  messagingSenderId: 'xxx',
  projectId: 'xxx',
  storageBucket: 'xxx',
}

export const reduxFirebase = {
  useFirestoreForProfile: false,
  enableLogging: false,
}

export const algolia = {
  appId: 'xxx',
  apiKey: 'xxx',
}

export const google = {
  apiKey: 'xxx',
  apiKeyGeo: 'xxx',
}

export default { firebase, reduxFirebase, algolia, google }
```

## 2. Set some cloudfunctions config

```bash
firebase functions:config:set algolia.appId="XXX" algolia.adminKey="XXXXXXXXXX" rendertron.appHost="YOUR_APPLICATION_HOST" rendertron.rendertronHost="YOUR_RENDERTRON_HOST"
```