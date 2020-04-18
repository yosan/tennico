import { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import * as React from 'react'
import CourtDetails from '../../components/courts/CourtDetails'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import fetch from 'node-fetch'

interface Props {
  name: string
  address: string
}

const Court: NextPage<Props> = (props) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Head>
        <title>{`${props.name} - Tennico`}</title>
        <meta name="description" content={props.address} />
      </Head>
      <Navbar />
      <CourtDetails id={id as string} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const id = context.params.id
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/tennico-f93a4/databases/(default)/documents/courts/${id}`
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
