const endpoint = 'https://beta3.api.climatiq.io/estimate'
const apiKey = import.meta.env.VITE_CLIMATIQ_API_KEY

export async function getCO2Estimate(activityId: string, parameters: Record<string, any>) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emission_factor: { activity_id: activityId },
      parameters,
    }),
  })

  if (!response.ok) {
    throw new Error(`Erreur API Climatiq: ${response.status}`)
  }

  return await response.json()
}
