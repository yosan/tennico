import Button from '@material-ui/core/Button'
import React from 'react'
import { FC, memo } from 'react'

type Mode = 'text' | 'location'

interface Props {
  mode: 'text' | 'location'
  onClick?: (mode: Mode) => void
}

const toggle = (mode: Mode): Mode => {
  switch (mode) {
    case 'text':
      return 'location'
    case 'location':
      return 'text'
    default:
      return 'text'
  }
}

const label = (mode: Mode) => {
  switch (mode) {
    case 'text':
      return '地図で検索'
    case 'location':
      return 'テキストで検索'
    default:
      ''
  }
}

const SearchModeButton: FC<Props> = ({ mode, onClick }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => onClick?.(toggle(mode))}
      style={{ margin: '8px' }}
    >
      {label(mode)}
    </Button>
  )
}

export default memo(SearchModeButton)
