import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import React from 'react'
import { memo } from 'react'

interface Props {
  absolute?: boolean
}

const Navbar: React.FC<Props> = ({ absolute }) => {
  return (
    <AppBar position={absolute ? 'absolute' : 'static'}>
      <Toolbar>
        <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h1" style={{ cursor: 'pointer' }}>
            Tennico
          </Typography>
        </Link>
        <Typography variant="caption" style={{ marginLeft: '20px' }}>
          東京のテニスコートを探そう
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default memo(Navbar)
