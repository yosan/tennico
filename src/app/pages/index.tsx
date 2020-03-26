import { NextPage } from 'next'
import * as React from 'react'
import App from '../components/App'
import Home from '../components/Home'
import Navbar from '../components/Navbar'

const IndexPage: NextPage<{}> = () => (
  <App>
    <Navbar />
    <Home />
  </App>
)

export default IndexPage
