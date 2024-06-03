'use client'
import Page from "@/components/Page"
import { Round, useTableStatus, useTables, useTablesFetch } from "@/hooks/tables"
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import * as React from 'react'
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from '@mui/material/MenuItem'
import Box from "@mui/material/Box"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type ViewType = 'all' | 'no'

export default function Tables() {
  const status = useTableStatus()
  const { table, tables, round, rounds, map } = useTables()
  const [viewType, setViewType] = React.useState<ViewType>('all')
  const [selectedRound, setSelectedRound] = React.useState<number>(-1)
  const [no, setNo] = React.useState<number>(-1)

  const roundList = React.useMemo(() => new Array(round).fill(null).map((_, index) => index + 1), [round])
  const noList = React.useMemo(() => new Array(table * 4).fill(null).map((_, index) => index + 1), [table])

  const handleChangeViewType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setViewType((event.target as HTMLInputElement).value as ViewType);
  }
  const handleChangeRound = (event: SelectChangeEvent) => {
    setSelectedRound(+event.target.value as number)
  };
  const handleChangeNo = (event: SelectChangeEvent) => {
    setNo(+event.target.value as number)
  };

  useTablesFetch()

  return (
    <Page>
      <Typography variant="h4" gutterBottom>卓組</Typography>
      <Box sx={{ display: 'grid', gap: '16px' }}>
        <Box sx={{ display: 'grid', gap: '12px', p: 2, border: '1px dashed grey' }}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">表示タイプ</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={viewType}
              onChange={handleChangeViewType}
            >
              <FormControlLabel value="all" control={<Radio />} label="全体" />
              <FormControlLabel value="no" control={<Radio />} label="参加番号から選択" />
            </RadioGroup>
          </FormControl>
          {viewType === 'all' && (
            <FormControl>
              <Select
                labelId="round-select-label"
                id="round-select"
                value={String(selectedRound)}
                disabled={status === 'pending'}
                label="Round"
                onChange={handleChangeRound}
              >
                <MenuItem value={-1}>回戦を選択</MenuItem>
                {roundList.map(round => <MenuItem key={round} value={round}>{round}回戦</MenuItem>)}
              </Select>
            </FormControl>
          )}
          {viewType === 'no' && (
            <FormControl>
              <Select
                labelId="no-select-label"
                id="no-select"
                value={String(no)}
                disabled={status === 'pending'}
                label="No"
                onChange={handleChangeNo}
              >
                <MenuItem value={-1}>参加番号を選択</MenuItem>
                {noList.map(no => <MenuItem key={no} value={no}>No.{no}</MenuItem>)}
              </Select>
            </FormControl>
          )}
        </Box>
        {viewType === 'all' && selectedRound !== -1 && (
          <Box sx={{ display: 'grid', gap: '24px' }}>
            {tables.map((table) => (
              <Box>
                <Typography variant="h5" gutterBottom>{table}卓</Typography>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">東</TableCell>
                        <TableCell align="center">南</TableCell>
                        <TableCell align="center">西</TableCell>
                        <TableCell align="center">北</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{map[table][selectedRound - 1][0]}</TableCell>
                        <TableCell align="center">{map[table][selectedRound - 1][1]}</TableCell>
                        <TableCell align="center">{map[table][selectedRound - 1][2]}</TableCell>
                        <TableCell align="center">{map[table][selectedRound - 1][3]}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

              </Box>
            ))}

          </Box>
        )}
        {viewType === 'no' && no !== -1 && (
          <Box>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" />
                    <TableCell align="center">卓番号</TableCell>
                    <TableCell align="center">位置</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rounds.map((round, index) => {
                    const findRound = round.find((r) => r.no === no) as Round
                    return (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center">{index + 1}回戦</TableCell>
                        <TableCell align="center">{findRound.table}</TableCell>
                        <TableCell align="center">{['東', '南', '西', '北'][findRound.position]}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </Page>
  );
}
