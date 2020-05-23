import CourtDetails from 'components/courts/CourtDetails'
import Navbar from 'components/Navbar'
import { firebase } from 'config'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'
import * as React from 'react'

interface Props {
  name: string
  address: string
}

const Court: NextPage<Props> = (props) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Head>
        <title>{`${props.name} - Tennico`}</title>
        <meta name="description" content={props.address} />
      </Head>
      <Navbar />
      <CourtDetails id={id as string} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.params.id
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${firebase.projectId}/databases/(default)/documents/courts/${id}`
  )
  const data = await res.json()
  return {
    props: {
      name: data.fields.name.stringValue,
      address: data.fields.address.stringValue,
    },
  }
}

export default Court
