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
  apiKey: 'xxx'
}

export default { firebase, reduxFirebase, algolia, google }
```