import Navbar from 'components/Navbar'
import Search from 'components/Search'
import { NextPage } from 'next'
import * as React from 'react'

const SearchPage: NextPage<{}> = () => (
  <div>
    <Navbar />
    <Search />
  </div>
)

export default SearchPage
