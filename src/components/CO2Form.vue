<template>
    <form @submit.prevent="calculate" class="max-w-xl mx-auto space-y-6">
      <!-- Sélection du type d'activité -->
      <div>
        <label class="block font-semibold">Type d'activité :</label>
        <select v-model="activity" class="w-full p-2 border rounded">
          <option value="cloud">Cloud (instance AWS)</option>
          <option value="flight">Vol (ville → ville)</option>
          <option value="custom">Électricité (résiduelle)</option>
        </select>
      </div>
  
      <!-- Formulaire pour Cloud et Électricité -->
      <div v-if="activity === 'cloud' || activity === 'custom'">
        <label class="block font-semibold">Quantité :</label>
        <input
          v-model.number="value"
          type="number"
          min="0"
          required
          class="w-full p-2 border rounded"
        />
        <p class="text-sm text-gray-500 mt-1">
          {{ activity === 'cloud' ? 'Durée en heures (h)' : 'En kWh (kilowatt-heure)' }}
        </p>
      </div>
  
      <!-- Formulaire pour Vol -->
      <div v-if="activity === 'flight'">
        <label class="block font-semibold">Ville de départ :</label>
        <input v-model="origin" type="text" required class="w-full p-2 border rounded mb-2" />
  
        <label class="block font-semibold">Ville d'arrivée :</label>
        <input v-model="destination" type="text" required class="w-full p-2 border rounded" />
      </div>
  
      <!-- Bouton -->
      <button class="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition">
        Calculer
      </button>
  
      <!-- Résultat -->
      <div
        v-if="result"
        class="mt-6 p-4 border rounded bg-white text-noir dark:bg-noir dark:text-ivoire space-y-2"
      >
        <h3 class="text-lg font-semibold mb-2">Résultat</h3>
  
        <!-- Commun (si présent) -->
        <p v-if="result.total_co2e"><strong>💨 CO₂ total :</strong> {{ result.total_co2e.toFixed(4) }} kg</p>
        <p v-else-if="result.co2e"><strong>💨 CO₂ émis :</strong> {{ result.co2e.toFixed(4) }} kg</p>
  
        <!-- Vol -->
        <div v-if="activity === 'flight'">
          <p><strong>Distance parcourue :</strong> {{ result.distance_km?.toFixed(1) }} km</p>
          <p><strong>Émissions directes :</strong> {{ result.direct_emissions?.co2e?.toFixed(2) }} kg</p>
          <p><strong>Émissions indirectes :</strong> {{ result.indirect_emissions?.co2e?.toFixed(2) }} kg</p>
        </div>
  
        <!-- Cloud -->
        <div v-if="activity === 'cloud'" class="space-y-2">
          <p><strong>💻 CPU :</strong> {{ result.cpu_estimate.co2e.toFixed(4) }} kg</p>
          <p><strong>🧠 Mémoire :</strong> {{ result.memory_estimate.co2e.toFixed(4) }} kg</p>
          <p><strong>🏗️ Émissions incorporées :</strong> {{ result.embodied_cpu_estimate.co2e.toFixed(4) }} kg</p>
          <p><strong>⚙️ Instance :</strong> {{ result.calculation_details.instance }} – 
            {{ result.calculation_details.vcpu_cores }} vCPU /
            {{ result.calculation_details.instance_memory }} GB RAM
          </p>
        </div>
  
        <!-- Électricité -->
        <div v-if="activity === 'custom' && result.emission_factor">
          <p><strong>Facteur utilisé :</strong> {{ result.emission_factor.name }}</p>
          <p><strong>Source :</strong> {{ result.emission_factor.source }} ({{ result.emission_factor.year }})</p>
        </div>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { getCO2Estimate } from '@/lib/climatiq'
  
  const activity = ref('cloud')
  const value = ref(100)
  const origin = ref('Paris')
  const destination = ref('Berlin')
  const result = ref<any>(null)
  
  watch(activity, () => {
    result.value = null
  })
  
  const calculate = async () => {
    result.value = null
    try {
      switch (activity.value) {
        case 'cloud':
          result.value = await calculateCloud(value.value)
          break
        case 'flight':
          result.value = await calculateFlight(origin.value, destination.value)
          break
        case 'custom':
          result.value = await calculateElectricity(value.value)
          break
        default:
          throw new Error("Type d'activité non reconnu")
      }
    } catch (e) {
      alert((e as Error).message)
    }
  }
  
  const calculateCloud = async (hours: number) => {
    const response = await fetch('https://api.climatiq.io/compute/v1/aws/instance', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_CLIMATIQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instance: 't2.nano',
        region: 'us_west_2',
        duration: hours,
        duration_unit: 'h',
      }),
    })
  
    if (!response.ok) throw new Error('Erreur API cloud : ' + response.status)
    return await response.json()
  }
  
  const calculateFlight = async (from: string, to: string) => {
    const response = await fetch('https://preview.api.climatiq.io/travel/v1-preview1/distance', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_CLIMATIQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        origin: { query: from },
        destination: { query: to },
        travel_mode: 'air',
      }),
    })
  
    if (!response.ok) throw new Error('Erreur API vol : ' + response.status)
    return await response.json()
  }
  
  const calculateElectricity = async (kwh: number) => {
    return await getCO2Estimate('electricity-supply_grid-source_residual_mix', {
      energy: kwh,
      energy_unit: 'kWh',
    })
  }
 </script>
  