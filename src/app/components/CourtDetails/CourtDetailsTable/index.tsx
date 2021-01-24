import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { Court } from 'models/court'
import { SurfaceType, surfaceTypeName } from 'models/surfaceType'
import moment from 'moment'
import * as React from 'react'

interface Props {
  court: Court
}

const useStyles = makeStyles({
  labelCell: {
    wordBreak: 'keep-all',
  },
  valueCell: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
  },
})

const CourtDetailsTable: React.FC<Props> = ({ court }) => {
  const classes = useStyles()

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className={classes.labelCell} component="th" scope="row">
            住所
          </TableCell>
          <TableCell className={classes.valueCell}>{court.address}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.labelCell} component="th" scope="row">
            料金
          </TableCell>
          <TableCell className={classes.valueCell}>{court.price}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.labelCell} component="th" scope="row">
            面数
          </TableCell>
          <TableCell className={classes.valueCell}>
            {court.surfaces &&
              Object.keys(court.surfaces).map((type, index) => {
                return (
                  <p key={index}>
                    {surfaceTypeName(SurfaceType[type])} {court.surfaces[type]}
                    面
                  </p>
                )
              })}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.labelCell} component="th" scope="row">
            ナイター
          </TableCell>
          <TableCell className={classes.valueCell}>
            {court.nighter ? 'あり' : 'なし'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            URL
          </TableCell>
          <TableCell
            className={classes.valueCell}
            style={{ overflowWrap: 'anywhere' }}
          >
            <Link href={court.url} target="_blank">
              {court.url}
            </Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.labelCell} component="th" scope="row">
            追加日
          </TableCell>
          <TableCell className={classes.valueCell}>
            {moment(court.createdAt.toDate()).calendar()}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default React.memo(CourtDetailsTable)
