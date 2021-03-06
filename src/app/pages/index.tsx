import Home from 'components/Home'
import Navbar from 'components/Navbar'
import { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react'

const IndexPage: NextPage<Record<string, unknown>> = () => (
  <>
    <Head>
      <title>Tennico - 東京のテニスコートを探そう</title>
      <meta name="description" content="東京のテニスコートを探そう" />
    </Head>
    <Navbar absolute />
    <Home />
  </>
)

export default IndexPage
