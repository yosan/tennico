import Link from 'next/link'
import React from 'react'

import styles from './styles.module.css'

interface Props {
  absolute?: boolean
}

const Navbar: React.FC<Props> = ({ absolute }) => {
  return (
    <nav
      className={`nav-wrapper teal accent-4 ${
        absolute === true ? styles.absolute : ''
      }`}
    >
      <div className="container">
        <Link href="/">
          <div className="brand-logo">Tennico</div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
