import Court from 'models/court'
import * as React from 'react'

interface Props {
  court: Court
}

const CourtSummary: React.FC<Props> = (props) => {
  return (
    <div className="col s12 m4">
      <div className="card">
        <div className="card-content grey-text text-darken-3">
          <p className="card-title">{props.court.name}</p>
          <p className="grey-text">{props.court.address}</p>
        </div>
      </div>
    </div>
  )
}

export default CourtSummary
