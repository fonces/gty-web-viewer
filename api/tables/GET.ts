import { Table } from "@/hooks/tables"

const ENDPOINT = 'https://script.google.com/macros/s/AKfycbwMVKrS8lt_U1zWy9n3sqk7qrHB8g9cewAfqErJZnkQ5iz9eFUYLieX9kVhPKcj5US_Eg/exec'

export default async function getTables(): Promise<Table> {
  return await fetch(ENDPOINT)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return await response.json()
    })
}
