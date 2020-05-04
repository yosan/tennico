import * as React from 'react'
import Court, { SurfaceType, surfaceTypeName } from 'models/court'
import moment from 'moment'

interface Props {
  court: Court
}

const CourtDetailsTable: React.FC<Props> = ({ court }) => {
  return (
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
                    {surfaceTypeName(SurfaceType[type])} {court.surfaces[type]}
                    面
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
  )
}

export default React.memo(CourtDetailsTable)
