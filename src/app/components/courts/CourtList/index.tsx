import Link from 'next/link'
import * as React from 'react'
import CourtSummary from 'components/courts/CourtSummary'
import Court from 'models/court'

interface Props {
  courts?: Court[]
}

const CourtList: React.FC<Props> = (props) => {
  return (
    <div className="section row">
      {props.courts &&
        props.courts.map((court) => {
          return (
            <Link href="/courts/[id]" as={'/courts/' + court.id} key={court.id}>
              <a>
                <CourtSummary court={court} key={court.id} />
              </a>
            </Link>
          )
        })}
    </div>
  )
}

export default CourtList
