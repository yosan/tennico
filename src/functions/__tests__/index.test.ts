import * as admin from 'firebase-admin'
import * as functionsTest from 'firebase-functions-test'

let mockSaveObject: ReturnType<typeof jest.fn>
jest.mock('algoliasearch', () => {
  mockSaveObject = jest.fn().mockReturnValue({})
  return {
    default: () => ({
      initIndex: () => ({
        saveObject: mockSaveObject,
      }),
    }),
  }
})

import * as index from '../firestore'

const ftest = functionsTest()

afterEach(() => {
  jest.clearAllMocks()
})

describe('courtCreated', () => {
  const wrapped = ftest.wrap(index.courtCreated)

  describe('when court is created', () => {
    beforeEach(async () => {
      const snapshot = ftest.firestore.makeDocumentSnapshot(
        {
          prefecture: '東京都',
          city: '江東区',
          line: '有明2-2-22',
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
        },
        'courts/Slsnk6XjulO3ndipFjlY',
      )

      await wrapped(snapshot)
    })

    test('algoalia API call parameters are correct', async () => {
      expect(mockSaveObject.mock.calls.length).toBe(1)
      expect(mockSaveObject.mock.calls[0][0]).toStrictEqual({
        objectID: 'Slsnk6XjulO3ndipFjlY',
        prefecture: '東京都',
        city: '江東区',
        line: '有明2-2-22',
        _geoloc: {
          lat: 35.635557,
          lng: 139.786987,
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
        createdAt: new Date('2021-01-01'),
      })
    })
  })
})

describe('courtUpdated', () => {
  const wrapped = ftest.wrap(index.courtUpdated)

  describe('when court is updated', () => {
    beforeEach(async () => {
      const before = ftest.firestore.makeDocumentSnapshot(
        {
          prefecture: '東京都',
          city: '江東区',
          line: '有明2-2-22',
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
        },
        'courts/Slsnk6XjulO3ndipFjlY',
      )

      const after = ftest.firestore.makeDocumentSnapshot(
        {
          prefecture: '東京都',
          city: '品川区',
          line: '八潮4-1-19',
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
        },
        'courts/Slsnk6XjulO3ndipFjlY',
      )

      await wrapped({ before, after })
    })

    test('algoalia API call parameters are correct', async () => {
      expect(mockSaveObject.mock.calls.length).toBe(1)
      expect(mockSaveObject.mock.calls[0][0]).toStrictEqual({
        objectID: 'Slsnk6XjulO3ndipFjlY',
        prefecture: '東京都',
        city: '品川区',
        line: '八潮4-1-19',
        _geoloc: {
          lat: 35.591023,
          lng: 139.752222,
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
        createdAt: new Date('2021-01-02'),
      })
    })
  })
})
