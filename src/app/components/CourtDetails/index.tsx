import { Box, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { ArrowBack } from '@mui/icons-material'
import CourtDetailsMap from 'components/CourtDetails/CourtDetailsMap'
import CourtDetailsTable from 'components/CourtDetails/CourtDetailsTable'
import { Court } from 'models/court'
import Head from 'next/head'
import Link from 'next/link'
import * as React from 'react'
import { useFirestoreCourt } from 'hooks'
import { getAnalytics, logEvent } from 'firebase/analytics'

interface Props {
  id: string
}

const CourtDetails: React.FC<Props> = ({ id }) => {
  const theme = useTheme()
  const court: Court | undefined = useFirestoreCourt(id)

  React.useEffect(() => {
    logEvent(getAnalytics(), 'select_content', { id })
  }, [id])

  if (!court) {
    return null
  }

  return (
    <main style={{ background: theme.palette.background.default }}>
      <Head>
        <title>{court.name}</title>
        <meta
          name="description"
          content={[court.prefecture, court.city, court.line].join('')}
        />
      </Head>
      <Box p={2}>
        <Typography
          variant="h1"
          gutterBottom
          style={{ color: theme.palette.primary.contrastText }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <IconButton style={{ color: theme.palette.primary.contrastText }}>
              <ArrowBack />
            </IconButton>
          </Link>
          {court.name}
        </Typography>
        <CourtDetailsMap courtDoc={{ id, data: court }} />
        <CourtDetailsTable court={court} />
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: '100%' }}
          >
            他のコートを検索する
          </Button>
        </Link>
      </Box>
    </main>
  )
}

export default React.memo(CourtDetails)
