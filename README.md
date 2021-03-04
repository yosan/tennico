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

## 2. Add src/app/.env

```
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_DATABASE_URL=xxx
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_STORAGE_BUCKET=xxx
NEXT_PUBLIC_ALGOLIA_APP_ID=xxx
NEXT_PUBLIC_ALGOLIA_API_KEY=xxx
NEXT_PUBLIC_GOOGLE_API_KEY=xxx
NEXT_PUBLIC_GOOGLE_API_KEY_GEO=xxx
NEXT_PUBLIC_SENTRY_DNS=xxx
```

## 2. Set some cloudfunctions config

```bash
firebase functions:config:set algolia.appId="XXX" algolia.adminKey="XXXXXXXXXX" rendertron.appHost="YOUR_APPLICATION_HOST" rendertron.rendertronHost="YOUR_RENDERTRON_HOST"
```