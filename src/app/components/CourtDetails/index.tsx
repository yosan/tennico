import 'firebase/analytics'

import CourtDetailsMap from 'components/CourtDetails/CourtDetailsMap'
import CourtDetailsTable from 'components/CourtDetails/CourtDetailsTable'
import firebase from 'firebase/app'
import { Court } from 'models/court'
import { State } from 'models/type'
import Head from 'next/head'
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

  if (!court) {
    return null
  }

  return (
    <main>
      <Head>
        <title>{`${court.name} - Tennico`}</title>
        <meta name="description" content={court.address} />
      </Head>
      <div className="container section project-details">
        <h4 className="header section">{court.name}</h4>
        <CourtDetailsMap court={court} />
        <CourtDetailsTable court={court} />
      </div>
    </main>
  )
}

export default React.memo(CourtDetails)
