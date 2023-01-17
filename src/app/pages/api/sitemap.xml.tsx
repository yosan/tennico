import config from 'config'
import { NextApiRequest, NextApiResponse } from 'next'
import { EnumChangefreq, SitemapStream, streamToPromise } from 'sitemap'
import { createGzip } from 'zlib'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

if (!getApps().length) {
  initializeApp(config.firebase)
}

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
      changefreq: EnumChangefreq.MONTHLY,
    })

    const querySnapshot = await getDocs(collection(getFirestore(), 'courts'))
    querySnapshot.docs.forEach((doc) => {
      smStream.write({
        url: `/courts/${doc.id}`,
        changefreq: EnumChangefreq.MONTHLY,
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
