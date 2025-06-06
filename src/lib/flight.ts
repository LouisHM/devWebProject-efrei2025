// ✈️ Estimateur de vol via endpoint preview
export async function calculateFlight(from: string, to: string) {
  const res = await fetch('https://preview.api.climatiq.io/travel/v1-preview1/distance', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CLIMATIQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      origin:      { query: from },
      destination: { query: to },
      travel_mode: 'air',
    }),
  })
  if (!res.ok) {
    throw new Error(`API flight error: ${res.status}`)
  }
  return await res.json()
}