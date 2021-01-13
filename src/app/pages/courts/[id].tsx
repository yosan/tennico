import 'firebase/analytics'
import 'firebase/firestore'

import CourtDetails from 'components/CourtDetails'
import Navbar from 'components/Navbar'
import firebase from 'firebase/app'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

const CourtPage: NextPage<Record<string, unknown>> = () => {
  const router = useRouter()
  const { id } = router.query

  React.useEffect(() => {
    firebase.analytics().logEvent('select_content', { court: id })
  }, [id])

  return (
    <>
      <Navbar />
      <CourtDetails id={id as string} />
    </>
  )
}

export default CourtPage
