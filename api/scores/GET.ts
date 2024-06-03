import { Score } from "@/hooks/scores"

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbzfZ2-UIaWqBmhjlGyC-XLh5lPpSaapYI4Wbxf_t9Z08EqmRdeyTTsgBiy1V2V2yAHXWQ/exec'

export default async function getScores(): Promise<Score[]> {
  return await fetch(ENDPOINT)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return await response.json()
    })
}
