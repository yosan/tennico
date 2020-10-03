import 'firebase/firestore'

import firebase from 'firebase/app'
import { NextApiRequest, NextApiResponse } from 'next'
import { EnumChangefreq, SitemapStream, streamToPromise } from 'sitemap'
import { createGzip } from 'zlib'

export default async (
  _req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (!res) return

  try {
    res.setHeader('content-type', 'application/xml')
    res.setHeader('Content-Encoding', 'gzip')

    const smStream = new SitemapStream({
      hostname: 'https://tennico.app',
    })

    const pipeline = smStream.pipe(createGzip())

    smStream.write({
      url: '/',
      changefreq: EnumChangefreq.WEEKLY,
    })

    const querySnapshot = await firebase.firestore().collection('courts').get()
    querySnapshot.docs.forEach((doc) => {
      smStream.write({
        url: `/courts/${doc.id}`,
        changefreq: EnumChangefreq.WEEKLY,
      })
    })

    smStream.end()

    streamToPromise(pipeline)

    pipeline.pipe(res).on('error', (e) => {
      throw e
    })
  } catch (e) {
    res.status(500).end()
  }
}
