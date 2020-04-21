import firebase from 'firebase/app'
import 'firebase/analytics'
import GoogleMapReact from 'google-map-react'
import moment from 'moment'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import Court, { SurfaceType, surfaceTypeName } from '../../../models/court'
import { State } from '../../../models/type'
import { google } from '../../../config'
import Pin from '../../Pin'

interface Props {
  id: string
}

const CourtDetails: React.FC<Props> = ({ id }) => {
  React.useEffect(() => {
    firebase.analytics().logEvent('select_content', { id })
  }, [id])
  useFirestoreConnect(() => ({
    collection: 'courts',
    doc: id,
  }))
  const court = useSelector((state: State) => {
    return (
      state.firestore.data.courts && (state.firestore.data.courts[id] as Court)
    )
  })

  if (court) {
    return (
      <main>
        <div className="container section project-details">
          <h1 className="header section">{court.name}</h1>
          {court.geo && (
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
                <Pin lat={court.geo.latitude} lng={court.geo.longitude} />
              </GoogleMapReact>
            </div>
          )}
          <table className="striped section">
            <tbody>
              <tr>
                <td>住所</td>
                <td>{court.address}</td>
              </tr>
              <tr>
                <td>料金</td>
                <td>{court.price}</td>
              </tr>
              <tr>
                <td>面数</td>
                <td>
                  {court.surfaces &&
                    Object.keys(court.surfaces).map((type, index) => {
                      return (
                        <p key={index}>
                          {surfaceTypeName(SurfaceType[type])}{' '}
                          {court.surfaces[type]}面
                        </p>
                      )
                    })}
                </td>
              </tr>
              <tr>
                <td>ナイター</td>
                <td>{court.nighter ? 'あり' : 'なし'}</td>
              </tr>
              <tr>
                <td>URL</td>
                <td>
                  <a href={court.url}>{court.url}</a>
                </td>
              </tr>
              <tr>
                <td>追加日</td>
                <td>{moment(court.createdAt.toDate()).calendar()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading court...</p>
      </div>
    )
  }
}

export default CourtDetails
