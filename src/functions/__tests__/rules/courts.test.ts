import * as firebase from '@firebase/rules-unit-testing'
import * as admin from 'firebase-admin'
import * as fs from 'fs'

const projectId = 'rules-courts-test'

beforeEach(async () => {
  firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync('firestore.rules', 'utf8'),
  })

  const adminApp = firebase.initializeAdminApp({ projectId })
  await adminApp
    .firestore()
    .collection('courts')
    .doc('Slsnk6XjulO3ndipFjlY')
    .set({
      address: '東京都江東区有明2-2-22',
      createdAt: admin.firestore.Timestamp.fromDate(new Date('2021-01-01')),
      geo: {
        _latitude: 35.635557,
        _longitude: 139.786987,
      },
      name: '有明テニスの森公園',
      nighter: true,
      price:
        '入場料なし 都内小・中・高等学校 1面1時間以内 平日 750 土日祝 900 その他 1面1時間以内 平日 1,500 土日祝 1,800 入場料あり 1面1時間以内 平日 2,500 土日祝 3,000',
      surfaces: {
        hard: 32,
        omni: 16,
      },
      url: 'http://www.tptc.co.jp/park/02_03',
    })
  await adminApp
    .firestore()
    .collection('courts')
    .doc('5dvq3wFZ362RLOSEfhVo')
    .set({
      address: '東京都品川区八潮4-1-19',
      createdAt: admin.firestore.Timestamp.fromDate(new Date('2021-01-02')),
      geo: {
        _latitude: 35.591023,
        _longitude: 139.752222,
      },
      name: '大井ふ頭海浜公園',
      nighter: true,
      price:
        '一般1時間以内 平日 1,500 土日祝 1,900　学校行事利用 1時間以内 平日 800 土日祝 900 夜間照明料 1時間以内 500',
      surfaces: {
        hard: 12,
        omni: 2,
      },
      url: 'http://seaside-park.jp/park_ooisports/',
    })
  await adminApp
    .firestore()
    .collection('users')
    .doc('1234567890abcdefghijklmopqrs')
    .set({
      admin: true,
    })

  await adminApp.delete()
})

afterEach(async () => {
  await firebase.clearFirestoreData({ projectId })
})

describe('when unauthorized user', () => {
  let app: ReturnType<typeof firebase.initializeTestApp>

  beforeEach(() => {
    app = firebase.initializeTestApp({
      projectId,
    })
  })

  afterEach(async () => {
    await app.delete()
  })

  describe('try to access courts collection', () => {
    test('read shoud be succeeded', async () => {
      await firebase.assertSucceeds(
        app.firestore().collection('courts').doc('Slsnk6XjulO3ndipFjlY').get()
      )
    })

    test('list shoud be succeeded', async () => {
      await firebase.assertSucceeds(app.firestore().collection('courts').get())
    })

    test('create shoud be failed', async () => {
      await firebase.assertFails(
        app
          .firestore()
          .collection('courts')
          .doc()
          .set({
            address: '東京都東大和市桜が丘二・三丁目',
            createdAt: firebase.firestore.Timestamp.fromDate(
              new Date('2021-01-01')
            ),
            geo: {
              _latitude: 35.7332582,
              _longitude: 139.4218217,
            },
            name: '東大和南公園',
            nighter: false,
            price: '1時間 1,300円',
            surfaces: {
              omni: 8,
            },
            url: 'https://www.tokyo-park.or.jp/park/format/index052.html',
          })
      )
    })

    test('update shoud be failed', async () => {
      await firebase.assertFails(
        app
          .firestore()
          .collection('courts')
          .doc('Slsnk6XjulO3ndipFjlY')
          .update({
            name: '有明テニスの森公園！',
          })
      )
    })
  })

  describe('try to access users collection', () => {
    test('read shoud be failed', async () => {
      await firebase.assertFails(
        app
          .firestore()
          .collection('users')
          .doc('1234567890abcdefghijklmopqrs')
          .get()
      )
    })

    test('list shoud be failed', async () => {
      await firebase.assertFails(app.firestore().collection('users').get())
    })

    test('create shoud be failed', async () => {
      await firebase.assertFails(
        app.firestore().collection('users').doc().set({
          admin: true,
        })
      )
    })

    test('update shoud be failed', async () => {
      await firebase.assertFails(
        app
          .firestore()
          .collection('users')
          .doc('1234567890abcdefghijklmopqrs')
          .update({
            admin: false,
          })
      )
    })
  })
})

describe('when authorized user', () => {
  let app: ReturnType<typeof firebase.initializeTestApp>

  beforeEach(() => {
    app = firebase.initializeTestApp({
      projectId,
      auth: { uid: 'abcdefghijklmopqrs1234567890' },
    })
  })

  afterEach(async () => {
    await app.delete()
  })

  describe('try to access courts collection', () => {
    test('read shoud be succeeded', async () => {
      await firebase.assertSucceeds(
        app.firestore().collection('courts').doc('Slsnk6XjulO3ndipFjlY').get()
      )
    })

    test('list shoud be succeeded', async () => {
      await firebase.assertSucceeds(app.firestore().collection('courts').get())
    })

    test('create shoud be failed', async () => {
      await firebase.assertFails(
        app
          .firestore()
          .collection('courts')
          .doc()
          .set({
            address: '東京都東大和市桜が丘二・三丁目',
            createdAt: firebase.firestore.Timestamp.fromDate(
              new Date('2021-01-01')
            ),
            geo: {
              _latitude: 35.7332582,
              _longitude: 139.4218217,
            },
            name: '東大和南公園',
            nighter: false,
            price: '1時間 1,300円',
            surfaces: {
              omni: 8,
            },
            url: 'https://www.tokyo-park.or.jp/park/format/index052.html',
          })
      )
    })

    test('update shoud be failed', async () => {
      await firebase.assertFails(
        app
          .firestore()
          .collection('courts')
          .doc('Slsnk6XjulO3ndipFjlY')
          .update({
            name: '有明テニスの森公園！',
          })
      )
    })
  })

  describe('try to access users collection', () => {
    test('read shoud be succeeded', async () => {
      await firebase.assertFails(
        app
          .firestore()
          .collection('users')
          .doc('1234567890abcdefghijklmopqrs')
          .get()
      )
    })

    test('list shoud be succeeded', async () => {
      await firebase.assertFails(app.firestore().collection('users').get())
    })

    test('create shoud be failed', async () => {
      await firebase.assertFails(
        app.firestore().collection('users').doc().set({
          admin: true,
        })
      )
    })

    test('update shoud be failed', async () => {
      await firebase.assertFails(
        app
          .firestore()
          .collection('users')
          .doc('1234567890abcdefghijklmopqrs')
          .update({
            admin: false,
          })
      )
    })
  })
})

describe('when admin user', () => {
  let app: ReturnType<typeof firebase.initializeTestApp>

  beforeEach(() => {
    app = firebase.initializeTestApp({
      projectId,
      auth: { uid: '1234567890abcdefghijklmopqrs' },
    })
  })

  afterEach(async () => {
    await app.delete()
  })

  describe('try to access courts collection', () => {
    test('read shoud be succeeded', async () => {
      await firebase.assertSucceeds(
        app.firestore().collection('courts').doc('Slsnk6XjulO3ndipFjlY').get()
      )
    })

    test('list shoud be succeeded', async () => {
      await firebase.assertSucceeds(app.firestore().collection('courts').get())
    })

    test('create shoud be succeeded', async () => {
      await firebase.assertSucceeds(
        app
          .firestore()
          .collection('courts')
          .doc()
          .set({
            address: '東京都東大和市桜が丘二・三丁目',
            createdAt: firebase.firestore.Timestamp.fromDate(
              new Date('2021-01-01')
            ),
            geo: {
              _latitude: 35.7332582,
              _longitude: 139.4218217,
            },
            name: '東大和南公園',
            nighter: false,
            price: '1時間 1,300円',
            surfaces: {
              omni: 8,
            },
            url: 'https://www.tokyo-park.or.jp/park/format/index052.html',
          })
      )
    })

    test('update shoud be succeeded', async () => {
      await firebase.assertSucceeds(
        app
          .firestore()
          .collection('courts')
          .doc('Slsnk6XjulO3ndipFjlY')
          .update({
            name: '有明テニスの森公園！',
          })
      )
    })
  })

  describe('try to access users collection', () => {
    test('read shoud be failed', async () => {
      await firebase.assertFails(
        app
          .firestore()
          .collection('users')
          .doc('1234567890abcdefghijklmopqrs')
          .get()
      )
    })

    test('list shoud be failed', async () => {
      await firebase.assertFails(app.firestore().collection('users').get())
    })

    test('create shoud be failed', async () => {
      await firebase.assertFails(
        app.firestore().collection('users').doc().set({
          admin: true,
        })
      )
    })

    test('update shoud be failed', async () => {
      await firebase.assertFails(
        app
          .firestore()
          .collection('users')
          .doc('1234567890abcdefghijklmopqrs')
          .update({
            admin: false,
          })
      )
    })
  })
})
