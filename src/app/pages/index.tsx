import { NextPage } from 'next'
import * as React from 'react'
import App from '../components/App'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import Head from 'next/head'

const IndexPage: NextPage<{}> = () => (
  <App>
    <Head>
      <title>Tennico</title>
      <meta name="description" content="近くのテニスコートを探そう" />
    </Head>
    <Navbar />
    <Home />
  </App>
)

export default IndexPage
