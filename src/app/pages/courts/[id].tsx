import CourtDetails from 'components/CourtDetails'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'

const CourtPage: NextPage<Record<string, unknown>> = () => {
  const router = useRouter()
  const { id } = router.query

  React.useEffect(() => {
    logEvent(getAnalytics(), 'select_content', { court: id })
  }, [id])

  return <CourtDetails id={id as string} />
}

export default CourtPage
