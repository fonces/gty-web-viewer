'use client'
import Page from "@/components/Page";
import { useScoresFetch, useScores, useScoreStatus } from "@/hooks/scores";
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMemo } from "react";

const sum = (scores: number[]) => scores.reduce((acc, score) => acc + score, 0)

export default function Scores() {
  const status = useScoreStatus()
  const scores = useScores()
  useScoresFetch()

  const sortedScores = useMemo(() => [...scores.sort((a, b) => sum(b.score) - sum(a.score))], [scores])

  return (
    <Page>
      <Typography variant="h4" gutterBottom>スコア</Typography>
      <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>参加者名</TableCell>
              <TableCell align="right">1回戦</TableCell>
              <TableCell align="right">2回戦</TableCell>
              <TableCell align="right">3回戦</TableCell>
              <TableCell align="right">4回戦</TableCell>
              <TableCell align="right">合計</TableCell>
              <TableCell align="right">順位</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {status !== 'idle' ? (
              <TableRow>
                <TableCell colSpan={8}>Loading...</TableCell>
              </TableRow>
            ) : sortedScores.map((score, index) => (
              <TableRow
                key={score.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {score.id}
                </TableCell>
                <TableCell>
                  {score.name || '-'}
                </TableCell>
                <TableCell align="right">{score.score[0] || 0}</TableCell>
                <TableCell align="right">{score.score[1] || 0}</TableCell>
                <TableCell align="right">{score.score[2] || 0}</TableCell>
                <TableCell align="right">{score.score[3] || 0}</TableCell>
                <TableCell align="right">{score.summary.toFixed(1)}</TableCell>
                <TableCell align="right">{index + 1}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
}
