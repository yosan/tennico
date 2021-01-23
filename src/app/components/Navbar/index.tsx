import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import React from 'react'
import { memo } from 'react'

interface Props {
  absolute?: boolean
}

const Navbar: React.FC<Props> = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Typography variant="h5">Tennico</Typography>
        </Link>
        <Typography variant="body1" style={{ marginLeft: '20px' }}>
          東京のテニスコートを探そう
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default memo(Navbar)
