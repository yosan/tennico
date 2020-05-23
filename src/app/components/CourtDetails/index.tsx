import 'firebase/analytics'

import CourtDetailsMap from 'components/CourtDetails/CourtDetailsMap'
import CourtDetailsTable from 'components/CourtDetails/CourtDetailsTable'
import firebase from 'firebase/app'
import Court from 'models/court'
import { State } from 'models/type'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

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
          <CourtDetailsMap court={court} />
          <CourtDetailsTable court={court} />
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

export default React.memo(CourtDetails)
