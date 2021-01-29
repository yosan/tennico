import LoggedIn from 'components/LoggedIn'
import Navbar from 'components/Navbar'
import NewCourt from 'components/NewCourt'
import { NextPage } from 'next'
import * as React from 'react'

const NewCourtPage: NextPage<Record<string, unknown>> = () => {
  return (
    <>
      <Navbar />
      <LoggedIn>
        <NewCourt />
      </LoggedIn>
    </>
  )
}

export default NewCourtPage
