import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import { FC, memo, useCallback, useState } from 'react'

interface Props {
  onSearch: (value?: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      margin: '8px',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
      marginRight: theme.spacing(1),
    },
  })
)

const SearchBar: FC<Props> = ({ onSearch }) => {
  const classes = useStyles()

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
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="キーワード 例)東京都"
        onChange={onChangeQuery}
        onKeyDown={onKeyDown}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={onClickGo}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default memo(SearchBar)
