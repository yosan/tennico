import React from 'react'
import { FC, useCallback } from 'react'

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
      className="material-icons"
      style={{
        color: selected ? 'green' : 'red',
        cursor: 'pointer',
        fontSize: selected ? '30px' : '24px',
      }}
      onClick={callback}
    >
      place
    </i>
  )
}

export default Pin
