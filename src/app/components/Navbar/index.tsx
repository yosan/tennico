import React from 'react'
import Link from 'next/link'

const Navbar: React.FC<{}> = () => {
  return (
    <nav className="nav-wrapper teal accent-4">
      <div className="container">
        <Link href="/">
          <div className="brand-logo">Tennico</div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
