import { Box, Button } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ArrowBack from '@material-ui/icons/ArrowBack'
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      background: theme.palette.background.default,
    },
    title: {
      color: theme.palette.primary.contrastText,
    },
    backButton: {
      color: theme.palette.primary.contrastText,
    },
    homeButton: {
      width: '100%',
    },
  })
)

const CourtDetails: React.FC<Props> = ({ id }) => {
  const classes = useStyles()
  const court: Court | undefined = useFirestoreCourt(id)

  React.useEffect(() => {
    logEvent(getAnalytics(), 'select_content', { id })
  }, [id])

  if (!court) {
    return null
  }

  return (
    <main className={classes.main}>
      <Head>
        <title>{court.name}</title>
        <meta
          name="description"
          content={[court.prefecture, court.city, court.line].join('')}
        />
      </Head>
      <Box p={2}>
        <Typography variant="h1" gutterBottom className={classes.title}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <IconButton className={classes.backButton}>
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
            className={classes.homeButton}
          >
            他のコートを検索する
          </Button>
        </Link>
      </Box>
    </main>
  )
}

export default React.memo(CourtDetails)
