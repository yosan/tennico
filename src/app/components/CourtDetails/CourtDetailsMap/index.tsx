import Pin from 'components/Pin'
import { google } from 'config'
import GoogleMapReact from 'google-map-react'
import { Court } from 'models/court'
import * as React from 'react'

import styles from './styles.module.css'

interface Props {
  court: Court
}

const createMapOptions = () => {
  return {
    panControl: false,
    zoomControl: false,
    fullscreenControl: false,
  }
}

const CourtDetailsMap: React.FC<Props> = ({ court }) => {
  return (
    court.geo && (
      <div className={styles.map}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: google.apiKey,
          }}
          defaultCenter={{
            lat: court.geo.latitude,
            lng: court.geo.longitude,
          }}
          defaultZoom={15}
          options={createMapOptions}
        >
          <Pin
            id={court.id}
            lat={court.geo.latitude}
            lng={court.geo.longitude}
            selected={false}
          />
        </GoogleMapReact>
      </div>
    )
  )
}

export default React.memo(CourtDetailsMap)
