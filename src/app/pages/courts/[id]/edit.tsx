import EditCourt from 'components/EditCourt'
import LoggedIn from 'components/LoggedIn'
import Navbar from 'components/Navbar'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

const EditCourtPage: NextPage<Record<string, unknown>> = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Navbar />
      <LoggedIn>
        <EditCourt id={id as string} />
      </LoggedIn>
    </>
  )
}

export default EditCourtPage
