import { NextPage } from 'next'
import * as React from 'react'
import App from '../components/App'
import Search from '../components/Search'
import Navbar from '../components/Navbar'

const SearchPage: NextPage<{}> = () => (
  <App>
    <Navbar />
    <Search />
  </App>
)

export default SearchPage
