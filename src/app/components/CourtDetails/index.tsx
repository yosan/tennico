import 'firebase/analytics'

import Container from '@material-ui/core/Container'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CourtDetailsMap from 'components/CourtDetails/CourtDetailsMap'
import CourtDetailsTable from 'components/CourtDetails/CourtDetailsTable'
import firebase from 'firebase/app'
import { Court } from 'models/court'
import { State } from 'models/type'
import Head from 'next/head'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

interface Props {
  id: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: theme.spacing(3),
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
    <main>
      <Head>
        <title>{`${court.name} - Tennico 東京のテニスコートを探そう`}</title>
        <meta name="description" content={court.address} />
      </Head>
      <Typography variant="h4" gutterBottom className={classes.title}>
        {court.name}
      </Typography>
      <Container>
        <CourtDetailsMap court={court} />
        <CourtDetailsTable court={court} />
      </Container>
    </main>
  )
}

export default React.memo(CourtDetails)
