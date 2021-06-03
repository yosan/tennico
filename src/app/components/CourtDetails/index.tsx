import 'firebase/analytics'

import { Box } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ArrowBack from '@material-ui/icons/ArrowBack'
import CourtDetailsMap from 'components/CourtDetails/CourtDetailsMap'
import CourtDetailsTable from 'components/CourtDetails/CourtDetailsTable'
import firebase from 'firebase/app'
import { Court } from 'models/court'
import { State } from 'models/type'
import Head from 'next/head'
import Link from 'next/link'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

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
  })
)

const CourtDetails: React.FC<Props> = ({ id }) => {
  const classes = useStyles()

  React.useEffect(() => {
    firebase.analytics().logEvent('select_content', { id })
  }, [id])
  useFirestoreConnect({
    collection: 'courts',
    doc: id,
  })
  const court = useSelector((state: State) => {
    return (
      state.firestore.data.courts && (state.firestore.data.courts[id] as Court)
    )
  })

  if (!court) {
    return null
  }

  return (
    <main className={classes.main}>
      <Head>
        <title>{`${court.name}の場所`}</title>
        <meta
          name="description"
          content={[court.prefecture, court.city, court.line].join('')}
        />
      </Head>
      <Box p={2}>
        <Typography variant="h4" gutterBottom className={classes.title}>
          <Link href="/">
            <IconButton className={classes.backButton}>
              <ArrowBack />
            </IconButton>
          </Link>
          {court.name}
        </Typography>
        <CourtDetailsMap courtDoc={{ id, data: court }} />
        <CourtDetailsTable court={court} />
      </Box>
    </main>
  )
}

export default React.memo(CourtDetails)
