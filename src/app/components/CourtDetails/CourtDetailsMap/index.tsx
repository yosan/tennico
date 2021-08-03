import { Paper } from '@material-ui/core'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import config from 'config'
import { CourtDoc } from 'models/court'
import * as React from 'react'

import styles from './styles.module.css'

interface Props {
  courtDoc: CourtDoc
}

const CourtDetailsMap: React.FC<Props> = ({ courtDoc }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.google.apiKey,
  })

  return (
    <Paper elevation={2} style={{ overflow: 'hidden', height: '400px' }}>
      {courtDoc.data.geo && isLoaded && (
        <GoogleMap
          mapContainerClassName={styles.map}
          center={{
            lat: courtDoc.data.geo.latitude,
            lng: courtDoc.data.geo.longitude,
          }}
          options={{
            panControl: false,
            zoomControl: false,
            fullscreenControl: false,
          }}
          zoom={15}
        >
          <Marker
            position={{
              lat: courtDoc.data.geo.latitude,
              lng: courtDoc.data.geo.longitude,
            }}
          />
        </GoogleMap>
      )}
    </Paper>
  )
}

export default React.memo(CourtDetailsMap)
