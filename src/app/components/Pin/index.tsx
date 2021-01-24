import { orange, red } from '@material-ui/core/colors'
import Room from '@material-ui/icons/Room'
import React from 'react'
import { FC, memo, useCallback } from 'react'

import styles from './styles.module.css'

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
  return (
    <Room
      className={selected ? styles.selected : styles.default}
      onClick={callback}
      style={{
        cursor: 'pointer',
        color: selected ? red[500] : orange[600],
        fontSize: selected ? 30 : 24,
      }}
    />
  )
}

export default memo(Pin)
