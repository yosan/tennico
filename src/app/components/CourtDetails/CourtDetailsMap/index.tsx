import Pin from 'components/Pin'
import config from 'config'
import GoogleMap from 'google-map-react'
import { CourtDoc } from 'models/court'
import * as React from 'react'

import styles from './styles.module.css'

interface Props {
  courtDoc: CourtDoc
}

const createMapOptions = () => {
  return {
    panControl: false,
    zoomControl: false,
    fullscreenControl: false,
  }
}

const CourtDetailsMap: React.FC<Props> = ({ courtDoc }) => {
  return (
    courtDoc.data.geo && (
      <div className={styles.map}>
        <GoogleMap
          bootstrapURLKeys={{
            key: config.google.apiKey,
          }}
          defaultCenter={{
            lat: courtDoc.data.geo.latitude,
            lng: courtDoc.data.geo.longitude,
          }}
          defaultZoom={15}
          options={createMapOptions}
        >
          <Pin
            id={courtDoc.id}
            lat={courtDoc.data.geo.latitude}
            lng={courtDoc.data.geo.longitude}
            selected={false}
          />
        </GoogleMap>
      </div>
    )
  )
}

export default React.memo(CourtDetailsMap)
