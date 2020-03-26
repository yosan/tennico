import { NextPage } from 'next'
import * as React from 'react'
import App from '../../components/App'
import CourtDetails from '../../components/courts/CourtDetails'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'

const Court: NextPage<{}> = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <App>
      <Navbar />
      <CourtDetails id={id as string} />
    </App>
  )
}

export default Court
