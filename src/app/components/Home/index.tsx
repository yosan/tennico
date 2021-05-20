import { Button, Container, Typography } from '@material-ui/core'
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api'
import SearchBar from 'components/SearchBar'
import SearchModeButton from 'components/SearchModeButton'
import config from 'config'
import {
  changeCenter,
  changeMode,
  changeZoom,
  selectCenter,
  selectMode,
  selectZoom,
} from 'features/home/homeSlice'
import { useAppDispatch, useAppSelector } from 'hooks'
import { CourtDoc } from 'models/court'
import { search, searchByGeo } from 'models/search'
import Link from 'next/link'
import React from 'react'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import styles from './styles.module.css'

const hits = 50

const Home: FC<Record<string, unknown>> = () => {
  const [query, setQuery] = useState('東京')
  const [courtDocs, setCourtDocs] = useState<CourtDoc[] | undefined>()
  const [selectedID, setSelectedID] = useState<string | undefined>()
  const [map, setMap] = useState(undefined)
  const [markerSize, setMarkerSize] = useState(undefined)
  const mapRef = useRef(null)
  const mode = useAppSelector(selectMode)
  const zoom = useAppSelector(selectZoom)
  const center = useAppSelector(selectCenter)
  const dispatch = useAppDispatch()

  const defaultCenter = useMemo(() => center, [])
  const defaultZoom = useMemo(() => zoom, [])

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.google.apiKey,
  })

  const onLoaded = useCallback((map) => {
    mapRef.current = map
    setMap(map)
    setMarkerSize(new window.google.maps.Size(0, -45))
  }, [])

  const onMapMoved = useCallback(() => {
    if (!mapRef.current) return
    const param = mapRef.current.getCenter()
    if (!param) return

    const currentCenter = {
      lat: param.lat(),
      lng: param.lng(),
    }

    dispatch(changeZoom(mapRef.current.getZoom()))
    dispatch(changeCenter(currentCenter))
  }, [mapRef])

  const onSearch = useCallback((value?: string) => {
    switch (mode) {
      case 'text':
        value && setQuery(value)
        break
      default:
        break
    }
  }, [])

  useEffect(() => {
    isLoaded &&
      map &&
      mode === 'text' &&
      search(query, hits)
        .then((courtDocs) => {
          setCourtDocs(courtDocs)

          const bounds = new window.google.maps.LatLngBounds()

          courtDocs.forEach((courtDoc) => {
            bounds.extend({
              lat: courtDoc.data.geo.latitude,
              lng: courtDoc.data.geo.longitude,
            })
          })

          map.fitBounds(bounds)
        })
        .catch((e) => console.error(e))
  }, [map, query, mode, isLoaded])

  useEffect(() => {
    isLoaded &&
      mode === 'location' &&
      center &&
      searchByGeo(center.lat, center.lng, hits)
        .then((courtDocs) => setCourtDocs(courtDocs))
        .catch((e) => console.error(e))
  }, [center, mode, isLoaded])

  const selectedCourtDoc = useMemo(() => {
    return courtDocs?.find((court) => court.id === selectedID)
  }, [selectedID, courtDocs])

  const onClickMarker = useCallback((id: string) => setSelectedID(id), [])
  const onClickMode = useCallback(
    (value: 'text' | 'location') => dispatch(changeMode(value)),
    []
  )

  return (
    <main className={styles.main}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          options={{
            panControl: false,
            zoomControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
          }}
          zoom={defaultZoom}
          center={defaultCenter}
          onIdle={onMapMoved}
          onLoad={onLoaded}
        >
          {courtDocs &&
            courtDocs.map((courtDoc) => {
              return (
                <Marker
                  key={courtDoc.id}
                  position={{
                    lat: courtDoc.data.geo.latitude,
                    lng: courtDoc.data.geo.longitude,
                  }}
                  onClick={() => onClickMarker(courtDoc.id)}
                />
              )
            })}
          {selectedCourtDoc && (
            <InfoWindow
              position={{
                lat: selectedCourtDoc.data.geo.latitude,
                lng: selectedCourtDoc.data.geo.longitude,
              }}
              options={{ pixelOffset: markerSize }}
              onCloseClick={() => setSelectedID(undefined)}
            >
              <Container>
                <Typography gutterBottom variant="h5" component="h2">
                  {selectedCourtDoc.data.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  {[
                    selectedCourtDoc.data.prefecture,
                    selectedCourtDoc.data.city,
                    selectedCourtDoc.data.line,
                  ].join('')}
                </Typography>
                <p>
                  <Link
                    href="/courts/[id]"
                    as={'/courts/' + selectedCourtDoc.id}
                    key={selectedCourtDoc.id}
                  >
                    <Button variant="outlined">詳細</Button>
                  </Link>
                </p>
              </Container>
            </InfoWindow>
          )}
        </GoogleMap>
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
