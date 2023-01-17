import { orange, red } from '@mui/material/colors'
import Room from '@mui/icons-material/Room'
import React from 'react'
import { FC, memo, useCallback } from 'react'

interface Props {
  id: string
  lat: number
  lng: number
  selected: boolean
  onClick?: (id: string) => void
}

const Pin: FC<Props> = ({ id, selected, onClick }) => {
  const callback = useCallback(() => {
    onClick?.(id)
  }, [id, onClick])
  const fontSize = selected ? 30 : 24
  return (
    <Room
      onClick={callback}
      style={{
        cursor: 'pointer',
        color: selected ? red[500] : orange[600],
        fontSize,
        marginLeft: -fontSize / 2,
        marginTop: -fontSize,
      }}
    />
  )
}

export default memo(Pin)
