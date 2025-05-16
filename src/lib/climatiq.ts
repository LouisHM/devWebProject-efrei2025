const endpoint = 'https://api.climatiq.io/data/v1/estimate';
const apiKey = import.meta.env.VITE_CLIMATIQ_API_KEY;

export async function getCO2Estimate(activityId: string, parameters: Record<string, any>) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emission_factor: {
        activity_id: activityId,
        data_version: '^3', // Utilise la dernière version disponible
      },
      parameters,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erreur API Climatiq: ${response.status}`);
  }

  return await response.json();
}
