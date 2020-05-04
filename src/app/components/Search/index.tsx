import Pin from 'components/Pin'
import { google } from 'config'
import * as geolib from 'geolib'
import GoogleMapReact from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'
import Court from 'models/court'
import { search } from 'models/search'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'

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

  const courtsCenter = useMemo(() => {
    if (!courts) {
      return false
    }
    return geolib.getCenter(
      courts.map((court) => {
        return {
          latitude: court.geo.latitude,
          longitude: court.geo.longitude,
        }
      })
    )
  }, [courts])

  const { center, zoom } = useMemo(() => {
    if (!courts) {
      return {}
    }

    if (courts.length === 1) {
      return {
        center: { lat: courts[0].geo.latitude, lng: courts[0].geo.longitude },
        zoom: 16,
      }
    }

    const lats = courts.map((court) => court.geo.latitude)
    const lngs = courts.map((court) => court.geo.longitude)
    const bounds = {
      nw: {
        lat: Math.max(...lats),
        lng: Math.min(...lngs),
      },
      se: {
        lat: Math.min(...lats),
        lng: Math.max(...lngs),
      },
    }

    const size = {
      width: window.innerWidth || document.body.clientWidth,
      height: window.innerHeight || document.body.clientHeight,
    }

    return fitBounds(bounds, size)
  }, [courts])

  const onClick = useCallback((id: string) => setSelectedID(id), [])

  return (
    <main>
      <div style={{ height: 'calc(100vh - 56px)', width: '100%' }}>
        {courts && courtsCenter && (
          <GoogleMapReact
            bootstrapURLKeys={{
              key: google.apiKey,
            }}
            defaultCenter={center}
            defaultZoom={zoom}
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
