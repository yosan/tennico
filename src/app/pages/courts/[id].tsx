import 'firebase/analytics'
import 'firebase/firestore'

import CourtDetails from 'components/CourtDetails'
import Navbar from 'components/Navbar'
import firebase from 'firebase/app'
import { Court } from 'models/court'
import { FirCourt, toCourt } from 'models/firebase'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import * as React from 'react'

type Props = Court

const CourtPage: NextPage<Props> = (props) => {
  const router = useRouter()
  const { id } = router.query

  console.log(props)

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
  const id = context.params.id as string
  const querySnapshot = await firebase
    .firestore()
    .collection('courts')
    .doc(id)
    .get()
  const fieldValues = querySnapshot.data()
  return {
    props: toCourt({ ...fieldValues, id } as FirCourt),
  }
}

export default CourtPage
