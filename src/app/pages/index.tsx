import { NextPage } from 'next'
import * as React from 'react'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import Head from 'next/head'

const IndexPage: NextPage<{}> = () => (
  <div>
    <Head>
      <title>Tennico</title>
      <meta name="description" content="近くのテニスコートを探そう" />
    </Head>
    <Navbar />
    <Home />
  </div>
)

export default IndexPage
