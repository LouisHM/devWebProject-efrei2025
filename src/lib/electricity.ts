
export interface ElectricityParams {
  region: string;
  year?: number;
  amount: number;
  recs?: number;
  source_set?: 'core' | 'iea';
  allow_iea_provisional?: boolean;
}

export async function calculateElectricity(params: ElectricityParams) {
  const body: any = {
    region: params.region,
    amount: {
      energy: params.amount,
      energy_unit: 'kWh',
    },
  };

  if (typeof params.year === 'number') {
    body.year = params.year;
  }
  if (typeof params.recs === 'number') {
    body.recs = {
      energy: params.recs,
      energy_unit: 'kWh',
    };
  }
  if (params.allow_iea_provisional) {
    body.allow_iea_provisional = true;
  }

  console.log('🟢 calculateElectricity – request body →', JSON.stringify(body, null, 2));

  const response = await fetch('https://api.climatiq.io/energy/v1/electricity', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CLIMATIQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let errJson = null;
    try {
      errJson = await response.json();
    } catch {}
    throw new Error(
      'Erreur API électricité ' +
        response.status +
        ' → ' +
        JSON.stringify(errJson, null, 2)
    );
  }

  const data = await response.json();
  console.log('🟢 calculateElectricity – response →', data);
  return data;
}



export const AVAILABLE_REGIONS = [
  { label: 'France', value: 'FR' },
  { label: 'Royaume-Uni', value: 'GB' },
  { label: 'États-Unis (CA)', value: 'US-CA' },
];

export const AVAILABLE_SOURCE_SETS = [
  { label: 'Core', value: 'core' },
  { label: 'IEA', value: 'iea' },
];

