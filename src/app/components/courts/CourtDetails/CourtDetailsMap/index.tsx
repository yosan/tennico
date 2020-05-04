import * as React from 'react'
import Court from 'models/court'
import GoogleMapReact from 'google-map-react'
import { google } from 'config'
import Pin from 'components/Pin'

interface Props {
  court: Court
}

const CourtDetailsMap: React.FC<Props> = ({ court }) => {
  return (
    court.geo && (
      <div className="section" style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: google.apiKey,
          }}
          defaultCenter={{
            lat: court.geo.latitude,
            lng: court.geo.longitude,
          }}
          defaultZoom={15}
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
