import React from 'react'

const Pin: React.FC<{ lat: number; lng: number }> = () => (
  <i className="material-icons" style={{ color: 'red' }}>
    place
  </i>
)

export default Pin
