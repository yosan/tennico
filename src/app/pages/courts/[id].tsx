import 'firebase/compat/analytics'
import 'firebase/compat/firestore'

import CourtDetails from 'components/CourtDetails'
import firebase from 'firebase/compat/app'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

const CourtPage: NextPage<Record<string, unknown>> = () => {
  const router = useRouter()
  const { id } = router.query

  React.useEffect(() => {
    firebase.analytics().logEvent('select_content', { court: id })
  }, [id])

  return <CourtDetails id={id as string} />
}

export default CourtPage
