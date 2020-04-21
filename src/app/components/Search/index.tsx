import React from 'react'
import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import GoogleMapReact from 'google-map-react'
import Court from '../../models/court'
import Pin from '../Pin'
import { search } from '../../models/search'
import { google } from '../../config'

const hits = 20

const Search: FC<{}> = () => {
  const router = useRouter()
  const { q } = router.query
  const [courts, setCourts] = useState<Court[] | undefined>()
  const text = q as string

  useEffect(() => {
    text &&
      search(text, hits)
        .then((courts) => setCourts(courts))
        .catch((e) => console.error(e))
  }, [text])

  return (
    <main className="section container">
      <div className="section" style={{ height: '400px', width: '100%' }}>
        {courts && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: google.apiKey,
            }}
            defaultCenter={{
              lat: courts[0].geo.latitude,
              lng: courts[0].geo.longitude,
            }}
            defaultZoom={10}
          >
            {courts.map((court) => {
              return (
                <Pin
                  key={court.id}
                  lat={court.geo.latitude}
                  lng={court.geo.longitude}
                />
              )
            })}
          </GoogleMapReact>
        )}
      </div>
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
