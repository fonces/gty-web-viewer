import { Table } from "@/hooks/tables"

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbzS2Pryw18ay0j1nLf63tbugD6RJju0m7-e1H9RclJQkq36Pfju6xWMDR0a4w2khHw/exec'

export default async function getTables(): Promise<Table> {
  return await fetch(ENDPOINT)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return await response.json()
    })
}
