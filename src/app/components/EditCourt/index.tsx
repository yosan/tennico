import CourtForms from 'components/CourtForms'
import { Court } from 'models/court'
import { State } from 'models/type'
import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

interface Props {
  id: string
}

const EditCourt: React.FC<Props> = ({ id }) => {
  useFirestoreConnect({
    collection: 'courts',
    doc: id,
  })
  const court = useSelector((state: State) => {
    return (
      state.firestore.data.courts && (state.firestore.data.courts[id] as Court)
    )
  })

  if (!court) {
    return null
  }

  return <CourtForms court={{ id: id, data: court }} />
}

export default EditCourt
