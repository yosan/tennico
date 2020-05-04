import CourtList from 'components/courts/CourtList'
import SearchBar from 'components/SearchBar'
import Court from 'models/court'
import { State } from 'models/type'
import Router from 'next/router'
import React from 'react'
import { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded, useFirestoreConnect } from 'react-redux-firebase'

const getSearchPath = (query: string | undefined) => {
  return query && `/search?q=${query}`
}

const Home: FC<{}> = () => {
  useFirestoreConnect(() => ({
    collection: 'courts',
    limit: 6,
  }))
  const courts = useSelector((state: State) => {
    return state.firestore.ordered.courts as Court[]
  })
  const onSearch = useCallback((query: string | undefined) => {
    const path = getSearchPath(query)
    path && Router.push(path)
  }, [])

  if (!isLoaded(courts)) {
    return <span>Loading...</span>
  }
  if (isEmpty(courts)) {
    return null
  }
  return (
    <div className="dashboard container">
      <section>
        <div className="row center">
          <br />
          <br />
          <h4 className="header col s12 light">近くのテニスコートを探そう</h4>
          <SearchBar onSearch={onSearch} />
          <br />
          <br />
        </div>
      </section>
      <section>
        <h6>最近追加されたコート</h6>
        <CourtList courts={courts} />
      </section>
    </div>
  )
}

export default Home
