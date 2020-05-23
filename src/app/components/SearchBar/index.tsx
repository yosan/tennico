import React from 'react'

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
    <div
      className="row"
      style={{
        backgroundColor: 'rgba(255,255,255,0.90)',
        padding: '5px 5px 0px 5px',
      }}
    >
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
