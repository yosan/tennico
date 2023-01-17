import { Button, Container, Typography } from '@mui/material'
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
  changeSelectedCourtID,
  changeZoom,
  searchByGeo,
  searchByText,
  selectCenter,
  selectCourtDocs,
  selectMode,
  selectSelectedCourtID,
  selectZoom,
} from 'features/home/homeSlice'
import { useAppDispatch, useAppSelector } from 'hooks'
import { CourtDoc } from 'models/court'
import Link from 'next/link'
import React from 'react'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import styles from './styles.module.css'

const hits = 50

const Home: FC<Record<string, unknown>> = () => {
  const [map, setMap] = useState(undefined)
  const [markerSize, setMarkerSize] = useState(undefined)
  const mapRef = useRef(null)
  const mode = useAppSelector(selectMode)
  const zoom = useAppSelector(selectZoom)
  const center = useAppSelector(selectCenter)
  const courtDocs = useAppSelector(selectCourtDocs)
  const selectedCourtID = useAppSelector(selectSelectedCourtID)
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
    if (courtDocs === undefined) {
      dispatch(searchByText({ text: '東京', hits }))
    }
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

  const onSearch = useCallback(
    (text?: string) => {
      switch (mode) {
        case 'text':
          if (text) {
            dispatch(searchByText({ text, hits })).then((action) => {
              const courtDocs = action.payload as CourtDoc[]
              const bounds = new window.google.maps.LatLngBounds()
              courtDocs.forEach((courtDoc) => {
                bounds.extend({
                  lat: courtDoc.data.geo.latitude,
                  lng: courtDoc.data.geo.longitude,
                })
              })
              map.fitBounds(bounds)
            })
          }
          break
        default:
          break
      }
    },
    [map, mode]
  )

  useEffect(() => {
    isLoaded &&
      mode === 'location' &&
      center &&
      dispatch(searchByGeo({ lat: center.lat, lng: center.lng, hits }))
  }, [center, mode, isLoaded])

  const selectedCourtDoc = useMemo(
    () => courtDocs?.find((court) => court.id === selectedCourtID),
    [selectedCourtID, courtDocs]
  )

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
                  onClick={() => dispatch(changeSelectedCourtID(courtDoc.id))}
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
              onCloseClick={() => dispatch(changeSelectedCourtID(undefined))}
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
                    style={{ textDecoration: 'none' }}
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
