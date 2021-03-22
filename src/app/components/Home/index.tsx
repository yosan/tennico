import { Card, CardContent, Container } from '@material-ui/core'
import CardActionArea from '@material-ui/core/CardActionArea'
import Typography from '@material-ui/core/Typography'
import Pin from 'components/Pin'
import SearchBar from 'components/SearchBar'
import SearchModeButton from 'components/SearchModeButton'
import config from 'config'
import GoogleMap, { fitBounds } from 'google-map-react'
import { CourtDoc } from 'models/court'
import { search, searchByGeo } from 'models/search'
import Link from 'next/link'
import React from 'react'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'

import styles from './styles.module.css'

const hits = 50

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
  const [courtDocs, setCourtDocs] = useState<CourtDoc[] | undefined>()
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
        .then((courtDocs) => setCourtDocs(courtDocs))
        .catch((e) => console.error(e))
  }, [query, mode])

  useEffect(() => {
    mode === 'location' &&
      mapCenter &&
      searchByGeo(mapCenter.lat, mapCenter.lng, hits)
        .then((courtDocs) => setCourtDocs(courtDocs))
        .catch((e) => console.error(e))
  }, [mapCenter, mode])

  const selectedCourtDoc = useMemo(() => {
    return courtDocs?.find((court) => court.id === selectedID)
  }, [selectedID, courtDocs])

  const { center, zoom } = useMemo(() => {
    if (!courtDocs || mode === 'location') {
      return {}
    }

    if (courtDocs.length === 1) {
      return {
        center: {
          lat: courtDocs[0].data.geo.latitude,
          lng: courtDocs[0].data.geo.longitude,
        },
        zoom: 16,
      }
    }

    const lats = courtDocs.map((court) => court.data.geo.latitude)
    const lngs = courtDocs.map((court) => court.data.geo.longitude)
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
  }, [courtDocs])

  const onClick = useCallback((id: string) => setSelectedID(id), [])
  const onClickMode = useCallback((value: 'text' | 'location') => {
    setMode(value)
  }, [])
  const onBoundsChange = useCallback((center) => setMapCenter(center), [])

  return (
    <main className={styles.main}>
      {courtDocs && config && (
        <GoogleMap
          bootstrapURLKeys={{
            key: config.google.apiKey,
          }}
          center={center}
          zoom={zoom}
          options={createMapOptions}
          onBoundsChange={onBoundsChange}
        >
          {courtDocs.map((courtDoc) => {
            return (
              <Pin
                key={courtDoc.id}
                id={courtDoc.id}
                lat={courtDoc.data.geo.latitude}
                lng={courtDoc.data.geo.longitude}
                selected={courtDoc.id === selectedID}
                onClick={onClick}
              />
            )
          })}
        </GoogleMap>
      )}
      {selectedCourtDoc && (
        <Container className={styles.card}>
          <Link
            href="/courts/[id]"
            as={'/courts/' + selectedCourtDoc.id}
            key={selectedCourtDoc.id}
          >
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {selectedCourtDoc.data.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {[
                      selectedCourtDoc.data.prefecture,
                      selectedCourtDoc.data.city,
                      selectedCourtDoc.data.line,
                    ].join('')}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Container>
      )}
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
