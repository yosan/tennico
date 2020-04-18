import { NextPage } from 'next'
import * as React from 'react'
import Search from '../components/Search'
import Navbar from '../components/Navbar'

const SearchPage: NextPage<{}> = () => (
  <div>
    <Navbar />
    <Search />
  </div>
)

export default SearchPage
