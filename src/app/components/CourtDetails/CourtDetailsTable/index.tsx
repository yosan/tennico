import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import { Court } from 'models/court'
import { SurfaceType, surfaceTypeName } from 'models/surfaceType'
import moment from 'moment'
import * as React from 'react'

interface Props {
  court: Court
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const CourtDetailsTable: React.FC<Props> = ({ court }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              住所
            </TableCell>
            <TableCell>{court.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              料金
            </TableCell>
            <TableCell>{court.price}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              面数
            </TableCell>
            <TableCell>
              {court.surfaces &&
                Object.keys(court.surfaces).map((type, index) => {
                  return (
                    <p key={index}>
                      {surfaceTypeName(SurfaceType[type])}{' '}
                      {court.surfaces[type]}面
                    </p>
                  )
                })}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              ナイター
            </TableCell>
            <TableCell>{court.nighter ? 'あり' : 'なし'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              URL
            </TableCell>
            <TableCell>{court.url}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              追加日
            </TableCell>
            <TableCell>{moment(court.createdAt.toDate()).calendar()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default React.memo(CourtDetailsTable)
