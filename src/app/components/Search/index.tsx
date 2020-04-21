import React from 'react'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
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
  const [selectedID, setSelectedID] = useState<string | undefined>()
  const text = q as string

  useEffect(() => {
    text &&
      search(text, hits)
        .then((courts) => setCourts(courts))
        .catch((e) => console.error(e))
  }, [text])

  const selectedCourt = useMemo(() => {
    return courts?.find((court) => court.id === selectedID)
  }, [selectedID, courts])

  const onClick = useCallback((id: string) => setSelectedID(id), [])

  return (
    <main>
      <div style={{ height: 'calc(100vh - 56px)', width: '100%' }}>
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
                  id={court.id}
                  lat={court.geo.latitude}
                  lng={court.geo.longitude}
                  selected={court.id === selectedID}
                  onClick={onClick}
                />
              )
            })}
          </GoogleMapReact>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          top: '70px',
          width: '100%',
          padding: '0 20px',
        }}
      >
        {selectedCourt && (
          <Link
            href="/courts/[id]"
            as={'/courts/' + selectedCourt.id}
            key={selectedCourt.id}
          >
            <a>
              <div className="card">
                <div className="card-content grey-text text-darken-3">
                  <p className="card-title">{selectedCourt.name}</p>
                  <p className="grey-text">{selectedCourt.address}</p>
                </div>
              </div>
            </a>
          </Link>
        )}
      </div>
    </main>
  )
}

export default Search
