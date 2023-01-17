import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Court } from 'models/court'
import { SurfaceType, surfaceTypeName } from 'models/surfaceType'
import moment from 'moment'
import * as React from 'react'
import { styled } from '@mui/material/styles'

interface Props {
  court: Court
}

const LabelCell = styled(TableCell)({
  wordBreak: 'keep-all',
})

const ValueCell = styled(TableCell)({
  overflowWrap: 'anywhere',
  wordBreak: 'break-all',
})

const CourtDetailsTable: React.FC<Props> = ({ court }) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <LabelCell scope="row">住所</LabelCell>
          <ValueCell>
            {[court.prefecture, court.city, court.line].join('')}
          </ValueCell>
        </TableRow>
        <TableRow>
          <LabelCell scope="row">料金</LabelCell>
          <ValueCell>{court.price}</ValueCell>
        </TableRow>
        <TableRow>
          <LabelCell scope="row">面数</LabelCell>
          <ValueCell>
            {court.surfaces &&
              Object.keys(court.surfaces).map((type, index) => {
                return (
                  <p key={index}>
                    {surfaceTypeName(SurfaceType[type])} {court.surfaces[type]}
                    面
                  </p>
                )
              })}
          </ValueCell>
        </TableRow>
        <TableRow>
          <LabelCell scope="row">ナイター</LabelCell>
          <ValueCell>{court.nighter ? 'あり' : 'なし'}</ValueCell>
        </TableRow>
        <TableRow>
          <TableCell scope="row">URL</TableCell>
          <ValueCell
            style={{ overflowWrap: 'anywhere', wordBreak: 'break-all' }}
          >
            <Link
              href={court.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              {court.url}
            </Link>
          </ValueCell>
        </TableRow>
        <TableRow>
          <LabelCell scope="row">追加日</LabelCell>
          <ValueCell>{moment(court.createdAt).calendar()}</ValueCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default React.memo(CourtDetailsTable)
