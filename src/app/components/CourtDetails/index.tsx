import CourtDetailsMap from 'components/CourtDetails/CourtDetailsMap'
import CourtDetailsTable from 'components/CourtDetails/CourtDetailsTable'
import { Court } from 'models/court'
import * as React from 'react'

interface Props {
  court: Court
}

const CourtDetails: React.FC<Props> = ({ court }) => {
  return (
    <main>
      <div className="container section project-details">
        <h4 className="header section">{court.name}</h4>
        <CourtDetailsMap court={court} />
        <CourtDetailsTable court={court} />
      </div>
    </main>
  )
}

export default React.memo(CourtDetails)
