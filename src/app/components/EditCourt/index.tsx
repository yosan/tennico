import CourtForms from 'components/CourtForms'
import { useFirestoreCourt } from 'hooks'
import { Court } from 'models/court'
import React from 'react'

interface Props {
  id: string
}

const EditCourt: React.FC<Props> = ({ id }) => {
  const court: Court | undefined = useFirestoreCourt(id)

  if (!court) {
    return null
  }

  return <CourtForms courtDoc={{ id: id, data: court }} />
}

export default EditCourt
