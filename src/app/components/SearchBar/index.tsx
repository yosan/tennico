import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'
import { FC, memo, useCallback, useState } from 'react'
import { useTheme } from '@mui/material/styles'

interface Props {
  onSearch: (value?: string) => void
}

const SearchBar: FC<Props> = ({ onSearch }) => {
  const theme = useTheme()
  const [query, setQuery] = useState<string | undefined>(undefined)

  const onChangeQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value)
    },
    [],
  )

  const onClickGo = useCallback(() => {
    onSearch(query)
  }, [query])

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter') {
        onSearch(query)
      }
    },
    [query],
  )

  return (
    <Paper
      style={{
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        margin: '8px',
      }}
    >
      <InputBase
        style={{
          marginLeft: theme.spacing(1),
          flex: 1,
        }}
        placeholder="キーワード 例)東京都"
        onChange={onChangeQuery}
        onKeyPress={onKeyPress}
      />
      <IconButton
        style={{
          padding: 10,
          marginRight: theme.spacing(1),
        }}
        aria-label="search"
        onClick={onClickGo}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default memo(SearchBar)
