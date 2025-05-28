// src/lib/cloud.ts

// 🌐 Liste des régions AWS
export const AVAILABLE_REGIONS = [
  { label: 'US West (Oregon)', value: 'us_west_2' },
  { label: 'US East (N. Virginia)', value: 'us_east_1' },
  { label: 'EU West (Ireland)', value: 'eu_west_1' },
  { label: 'Asia Pacific (Singapore)', value: 'ap_southeast_1' },
]

// 🖥️ Types d’instances EC2 courants
export const AVAILABLE_INSTANCES = [
  { label: 't2.nano',    value: 't2.nano'    },
  { label: 't2.micro',   value: 't2.micro'   },
  { label: 't3.micro',   value: 't3.micro'   },
  { label: 'c5.large',   value: 'c5.large'   },
  { label: 'm5.large',   value: 'm5.large'   },
]

// 💾 Types de stockage
export const AVAILABLE_STORAGE_TYPES = [
  { label: 'SSD', value: 'ssd' },
  { label: 'HDD', value: 'hdd' },
]

// 🔎 Estimateur pour une instance EC2 + stockage
export async function calculateCloud(
  instance: string,
  region: string,
  duration: number,
  storage: number,
  storageType: 'ssd' | 'hdd' = 'ssd'
) {
  // Instance (CPU + RAM + embodied)
  const instRes = await fetch('https://api.climatiq.io/compute/v1/aws/instance', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CLIMATIQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      instance,
      region,
      duration,
      duration_unit: 'h',
    }),
  })
  if (!instRes.ok) {
    throw new Error(`API instance error: ${instRes.status}`)
  }
  const instanceData = await instRes.json()

  // Stockage
  const storRes = await fetch('https://api.climatiq.io/compute/v1/aws/storage', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CLIMATIQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      region,
      data: storage,
      data_unit: 'GB',
      storage_type: storageType,
      duration,
      duration_unit: 'h',
    }),
  })
  if (!storRes.ok) {
    throw new Error(`API storage error: ${storRes.status}`)
  }
  const storageData = await storRes.json()

  // Retour fusionné
  return {
    ...instanceData,
    storage_estimate: storageData,
  }
}

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
