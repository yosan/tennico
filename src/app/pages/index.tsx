import Home from 'components/Home'
import Navbar from 'components/Navbar'
import { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'

const IndexPage: NextPage<Record<string, unknown>> = () => (
  <>
    <Head>
      <title>Tennico</title>
      <meta name="description" content="近くのテニスコートを探そう" />
    </Head>
    <Navbar absolute={true} />
    <Home />
  </>
)

export default IndexPage
