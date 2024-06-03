import * as React from "react"
import getScores from '@/api/scores/GET'

export type Status = 'init' | 'idle' | 'pending' | 'error'

export type Score = {
  id: number
  name: string
  score: number[]
  summary: number
  rank: number
}

interface ScoresState {
  status: Status
  scores: Score[]
  setStatus: React.Dispatch<React.SetStateAction<Status>>
  setScores: React.Dispatch<React.SetStateAction<Score[]>>
}

const ScoresContext = React.createContext<ScoresState>({
  status: 'init',
  scores: [],
  setStatus: () => undefined,
  setScores: () => undefined,
});

export const ScoresProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = React.useState<Status>('init');
  const [scores, setScores] = React.useState<Score[]>([]);

  return (
    <ScoresContext.Provider value={{ status, scores, setStatus, setScores }}>
      {children}
    </ScoresContext.Provider>
  );
};

export const useScoresFetch = () => {
  const { status, setStatus, setScores } = React.useContext(ScoresContext)

  const execute = React.useCallback(async () => {
    try {
      setStatus('pending')
      const scores = await getScores()
      setScores(scores)
      setStatus('idle')
    } catch (e) {
      setScores([])
      setStatus('error')
    }
  }, [])

  React.useEffect(() => {
    if (status !== 'pending') {
      execute()
    }
  }, [])

  return {
    execute
  }
}

export const useScores = () => React.useContext(ScoresContext).scores
export const useScoreStatus = () => React.useContext(ScoresContext).status
