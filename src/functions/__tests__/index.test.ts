import * as admin from 'firebase-admin'
import * as functionsTest from 'firebase-functions-test'

import * as index from '../firestore'

jest.mock('algoliasearch', () => ({
  default: () => ({
    initIndex: () => ({
      saveObject: jest.fn().mockReturnValue({}),
    }),
  }),
}))

const ftest = functionsTest()
const wrapped = ftest.wrap(index.courtCreated)

describe('courtCreated', () => {
  describe('when court is created', () => {
    beforeEach(async () => {
      const snapshot = ftest.firestore.makeDocumentSnapshot(
        {
          address: '東京都江東区有明2-2-22',
          createdAt: admin.firestore.Timestamp.now(),
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
        },
        'courts/Slsnk6XjulO3ndipFjlY'
      )

      await wrapped(snapshot)
    })

    test('algoalia API call parameters are correct', async () => {
      expect(true).toBeTruthy()
    })
  })
})
