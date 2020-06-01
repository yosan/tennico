import React from 'react'
import { FC, memo, useCallback, useState } from 'react'

import styles from './styles.module.css'

interface Props {
  onSearch: (value?: string) => void
}

const SearchBar: FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState<string | undefined>(undefined)

  const onChangeQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    []
  )

  const onClickGo = useCallback(() => {
    onSearch(query)
  }, [query])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        onSearch(query)
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
        className="validate col s10"
        onChange={onChangeQuery}
        onKeyDown={onKeyDown}
      />
      <div className="btn col s2" onClick={onClickGo}>
        Go
      </div>
    </div>
  )
}

export default memo(SearchBar)
