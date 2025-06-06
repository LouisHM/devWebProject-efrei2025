// ⚡ Estimateur électricité générique
export async function calculateElectricity(kwh: number) {
  const res = await fetch('https://api.climatiq.io/data/v1/estimate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CLIMATIQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emission_factor: {
        activity_id:  'electricity-supply_grid-source_residual_mix',
        data_version: '^3',
      },
      parameters: {
        energy:      kwh,
        energy_unit: 'kWh',
      },
    }),
  })
  if (!res.ok) {
    throw new Error(`API electricity error: ${res.status}`)
  }
  return await res.json()
}