import Pin from 'components/Pin'
import SearchBar from 'components/SearchBar'
import { google } from 'config'
import * as geolib from 'geolib'
import GoogleMap from 'google-map-react'
import { fitBounds } from 'google-map-react/utils'
import Court from 'models/court'
import { search } from 'models/search'
import Link from 'next/link'
import React from 'react'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'

const hits = 20

const createMapOptions = () => {
  return {
    panControl: false,
    zoomControl: false,
    fullscreenControl: false,
  }
}

const Home: FC<{}> = () => {
  const [query, setQuery] = useState('東京')
  const [courts, setCourts] = useState<Court[] | undefined>()
  const [selectedID, setSelectedID] = useState<string | undefined>()
  const onSearch = useCallback((query: string | undefined) => {
    query && setQuery(query)
  }, [])

  useEffect(() => {
    search(query, hits)
      .then((courts) => setCourts(courts))
      .catch((e) => console.error(e))
  }, [query])

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
    <main style={{ height: '100%', width: '100%' }}>
      <div style={{ height: '100%', width: '100%' }}>
        {courts && courtsCenter && (
          <GoogleMap
            bootstrapURLKeys={{
              key: google.apiKey,
            }}
            defaultCenter={center}
            defaultZoom={zoom}
            options={createMapOptions}
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
          </GoogleMap>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '0px',
          width: '100%',
          padding: '0',
        }}
      >
        <SearchBar onSearch={onSearch} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '60px',
          width: '100%',
          padding: '0 10px',
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

export default Home
