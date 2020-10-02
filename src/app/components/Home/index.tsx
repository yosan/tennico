import Pin from 'components/Pin'
import SearchBar from 'components/SearchBar'
import SearchModeButton from 'components/SearchModeButton'
import { google } from 'config'
import GoogleMap, { fitBounds } from 'google-map-react'
import { Court } from 'models/court'
import { search, searchByGeo } from 'models/search'
import Link from 'next/link'
import React from 'react'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'

import styles from './styles.module.css'

const hits = 10

const createMapOptions = () => {
  return {
    panControl: false,
    zoomControl: false,
    fullscreenControl: false,
  }
}

const Home: FC<Record<string, unknown>> = () => {
  const [mode, setMode] = useState<'text' | 'location'>('text')
  const [query, setQuery] = useState('東京')
  const [courts, setCourts] = useState<Court[] | undefined>()
  const [selectedID, setSelectedID] = useState<string | undefined>()
  const [mapCenter, setMapCenter] = useState<
    { lat: number; lng: number } | undefined
  >()
  const onSearch = useCallback((value?: string) => {
    switch (mode) {
      case 'text':
        setMode('text')
        value && setQuery(value)
        break
      case 'location':
        setMode('location')
        break
      default:
        break
    }
  }, [])

  useEffect(() => {
    mode === 'text' &&
      search(query, hits)
        .then((courts) => setCourts(courts))
        .catch((e) => console.error(e))
  }, [query, mode])

  useEffect(() => {
    mode === 'location' &&
      mapCenter &&
      searchByGeo(mapCenter.lat, mapCenter.lng, hits)
        .then((courts) => setCourts(courts))
        .catch((e) => console.error(e))
  }, [mapCenter, mode])

  const selectedCourt = useMemo(() => {
    return courts?.find((court) => court.id === selectedID)
  }, [selectedID, courts])

  const { center, zoom } = useMemo(() => {
    if (!courts || mode === 'location') {
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
  const onClickMode = useCallback((value: 'text' | 'location') => {
    setMode(value)
  }, [])
  const onBoundsChange = useCallback((center) => setMapCenter(center), [])

  return (
    <main className={styles.main}>
      {courts && (
        <GoogleMap
          bootstrapURLKeys={{
            key: google.apiKey,
          }}
          center={center}
          zoom={zoom}
          options={createMapOptions}
          onBoundsChange={onBoundsChange}
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
      <div className={styles.card}>
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
      <div className={styles.controls}>
        <div className={styles.modeButton}>
          <SearchModeButton mode={mode} onClick={onClickMode} />
        </div>
        {mode === 'text' && (
          <div>
            <SearchBar onSearch={onSearch} />
          </div>
        )}
      </div>
    </main>
  )
}

export default Home
