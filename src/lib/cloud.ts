
export const AVAILABLE_REGIONS = [
  { label: 'US West (Oregon)', value: 'us_west_2' },
  { label: 'US East (N. Virginia)', value: 'us_east_1' },
  { label: 'EU West (Ireland)', value: 'eu_west_1' },
  { label: 'Asia Pacific (Singapore)', value: 'ap_southeast_1' },
]

export const AVAILABLE_INSTANCES = [
  { label: 't2.nano',    value: 't2.nano'    },
  { label: 't2.micro',   value: 't2.micro'   },
  { label: 't3.micro',   value: 't3.micro'   },
  { label: 'c5.large',   value: 'c5.large'   },
  { label: 'm5.large',   value: 'm5.large'   },
]

export const AVAILABLE_STORAGE_TYPES = [
  { label: 'SSD', value: 'ssd' },
  { label: 'HDD', value: 'hdd' },
]

export async function calculateCloud(
  instance: string,
  region: string,
  duration: number,
  storage: number,
  storageType: 'ssd' | 'hdd' = 'ssd'
) {
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

  return {
    ...instanceData,
    storage_estimate: storageData,
  }
}




