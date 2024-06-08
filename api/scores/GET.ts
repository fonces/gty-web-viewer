import { Score } from "@/hooks/scores"

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbw0g8WCegInxaALa0WvcXKdQxY7E_9fh-2aoZbPnj9xWVYO0s3nFnhBSJFlSIrVqEanIg/exec'

export default async function getScores(): Promise<Score[]> {
  return await fetch(ENDPOINT)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return await response.json()
    })
}
