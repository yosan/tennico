import React from 'react'
import { FC, memo, useCallback, useEffect, useState } from 'react'

import styles from './styles.module.css'

interface Props {
  onSearch: (mode: 'text' | 'location', value?: string) => void
}

const SearchBar: FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState<string | undefined>(undefined)
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false)

  const onChangeQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    []
  )

  useEffect(() => {
    if (locationEnabled) {
      setQuery(undefined)
    }
  }, [locationEnabled])

  const onClickGo = useCallback(() => {
    setLocationEnabled(false)
    onSearch('text', query)
  }, [query])
  const onClickLocation = useCallback(() => {
    const newValue = !locationEnabled
    setLocationEnabled(newValue)
    onSearch(newValue ? 'location' : 'text', query)
  }, [locationEnabled])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        setLocationEnabled(false)
        onSearch('text', query)
      }
    },
    [query]
  )

  return (
    <div className={`row ${styles.container}`}>
      <input
        type="text"
        id="search"
        placeholder="キーワード 例)東京都"
        className="validate col s8"
        onChange={onChangeQuery}
        onKeyDown={onKeyDown}
      />
      <div className="btn col s2" onClick={onClickGo}>
        Go
      </div>
      <div
        className={`btn col s2 ${locationEnabled ? '' : 'green lighten-5'}`}
        onClick={onClickLocation}
      >
        Loc
      </div>
    </div>
  )
}

export default memo(SearchBar)
