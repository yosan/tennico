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
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
      />
    </Head>
    <Navbar />
    <Home />
  </App>
)

export default IndexPage
