import 'firebase/analytics'

import CourtDetails from 'components/CourtDetails'
import Navbar from 'components/Navbar'
import { firebase as config } from 'config'
import firebase from 'firebase/app'
import { Court } from 'models/court'
import { toCourt } from 'models/firebase'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import * as React from 'react'

type Props = Court

const CourtPage: NextPage<Props> = (props) => {
  const router = useRouter()
  const { id } = router.query

  React.useEffect(() => {
    firebase.analytics().logEvent('select_content', { court: id })
  }, [id])

  return (
    <>
      <Head>
        <title>{`${props.name} - Tennico`}</title>
        <meta name="description" content={props.address} />
      </Head>
      <Navbar />
      <CourtDetails court={props} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.params.id
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${config.projectId}/databases/(default)/documents/courts/${id}`
  )
  const data = await res.json()
  return {
    props: toCourt(data),
  }
}

export default CourtPage
