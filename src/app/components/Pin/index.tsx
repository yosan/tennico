import React from 'react'
import { FC, useCallback } from 'react'

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
    <i
      className={`material-icons ${
        selected ? styles.selected : styles.default
      }`}
      onClick={callback}
    >
      place
    </i>
  )
}

export default Pin
