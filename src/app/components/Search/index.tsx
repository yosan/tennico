import React from 'react'
import { FC, useEffect, useState } from 'react'
import algoliasearch from 'algoliasearch'
import Court from '../../models/court'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { algolia } from '../../config'

const client = algoliasearch(algolia.appId, algolia.apiKey)
const index = client.initIndex('courts')

const Search: FC<{}> = () => {
  const router = useRouter()
  const { q } = router.query
  const [courts, setCourts] = useState<Court[] | undefined>()
  const text = q as string

  useEffect(() => {
    let cleanedUp = false

    text &&
      index
        .search<Court>(text, { hitsPerPage: 20 })
        .then((result) => {
          if (cleanedUp) {
            return
          }
          const hitCourts = result.hits.map((hit) => {
            return { id: hit.objectID, ...hit }
          })
          setCourts(hitCourts)
        })
        .catch((e) => console.error(e))

    const cleanup = () => {
      cleanedUp = true
    }
    return cleanup
  }, [text])

  return (
    <main className="section container">
      <div className="collection">
        {courts &&
          courts.map((court: Court) => {
            return (
              <Link
                href="/courts/[id]"
                as={'/courts/' + court.id}
                key={court.id}
              >
                <a className="collection-item">
                  <h5>{court.name}</h5>
                  <p>{court.address}</p>
                </a>
              </Link>
            )
          })}
      </div>
    </main>
  )
}

export default Search
