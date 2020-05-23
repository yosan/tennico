import React from 'react'

import styles from './styles.module.css'

interface Props {
  onSearch: (value: string | undefined) => void
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = React.useState<string | undefined>(undefined)
  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    []
  )
  const onClick = React.useCallback(() => {
    onSearch(query)
  }, [query])
  const onKeyDown = React.useCallback(
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
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <div className="btn col s2" onClick={onClick}>
        Go
      </div>
    </div>
  )
}

export default SearchBar
