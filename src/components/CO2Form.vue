<template>
  <div class="max-w-2xl mx-auto p-6">
    <form
      @submit.prevent="calculate"
      class="space-y-6 bg-white dark:bg-noir text-noir dark:text-ivoire rounded-lg shadow-lg p-6"
    >
      <!-- Sélection du type d'activité -->
      <div>
        <label class="block font-semibold">Type d'activité :</label>
        <select v-model="activity" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-noir text-noir dark:text-ivoire">
          <option value="cloud">Cloud (instance AWS)</option>
          <option value="flight">Vol (ville → ville)</option>
          <option value="custom">Électricité (résiduelle)</option>
        </select>
      </div>

    <!-- Formulaire pour Cloud -->
<div v-if="activity === 'cloud'" class="space-y-4">
  <!-- Durée -->
  <div>
    <label class="block font-semibold">Durée (h) :</label>
    <input
      v-model.number="duration"
      type="number"
      min="1"
      required
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-noir text-noir dark:text-ivoire"
    />
  </div>

  <!-- Instance -->
  <div>
    <label class="block font-semibold">Type d'instance :</label>
    <select v-model="instance" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-noir text-noir dark:text-ivoire">
      <option v-for="opt in AVAILABLE_INSTANCES" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>

  <!-- Région -->
  <div>
    <label class="block font-semibold">Région cloud :</label>
    <select v-model="region" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-noir text-noir dark:text-ivoire">
      <option v-for="opt in AVAILABLE_REGIONS" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>

  <!-- Stockage -->
  <div>
    <label class="block font-semibold">Stockage alloué (en Go) :</label>
    <input
      v-model.number="storage"
      type="number"
      min="0"
      required
      class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-noir text-noir dark:text-ivoire"
    />
  </div>

  <!-- Type de stockage -->
  <div>
    <label class="block font-semibold">Type de stockage :</label>
    <select v-model="storageType" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-noir text-noir dark:text-ivoire">
      <option v-for="opt in AVAILABLE_STORAGE_TYPES" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</div>


      <!-- Formulaire pour Électricité -->
      <div v-if="activity === 'custom'">
        <label class="block font-semibold">Quantité :</label>
        <input
          v-model.number="value"
          type="number"
          min="0"
          required
          class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-noir text-noir dark:text-ivoire"
        />
        <p class="text-sm text-gray-500 mt-1">En kWh (kilowatt-heure)</p>
      </div>

      <!-- Formulaire pour Vol -->
      <div v-if="activity === 'flight'">
        <label class="block font-semibold">Ville de départ :</label>
        <input v-model="origin" type="text" required class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-noir text-noir dark:text-ivoire mb-2" />

        <label class="block font-semibold">Ville d'arrivée :</label>
        <input v-model="destination" type="text" required class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-noir text-noir dark:text-ivoire" />
      </div>

      <!-- Bouton -->
      <div class="pt-4">
        <button
          class="bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded shadow transition duration-300 ease-in-out transform hover:scale-105"
        >
          Calculer
        </button>
      </div>

      <!-- Résultat -->
      <transition name="fade" mode="out-in">
        <div
          v-if="result"
          class="mt-6 p-4 border border-gray-300 dark:border-gray-600 rounded bg-white text-noir dark:bg-noir dark:text-ivoire space-y-2 shadow-md"
        >
          <h3 class="text-2xl font-bold mb-4">🎯 Résultat</h3>

          <p v-if="result.total_co2e">
            <strong>💨 CO₂ total :</strong> {{ result.total_co2e.toFixed(4) }} kg
          </p>
          <p v-else-if="result.co2e">
            <strong>💨 CO₂ émis :</strong> {{ result.co2e.toFixed(4) }} kg
          </p>

          <div v-if="activity === 'flight'">
            <p><strong>Distance parcourue :</strong> {{ result.distance_km?.toFixed(1) }} km</p>
            <p><strong>Émissions directes :</strong> {{ result.direct_emissions?.co2e?.toFixed(2) }} kg</p>
            <p><strong>Émissions indirectes :</strong> {{ result.indirect_emissions?.co2e?.toFixed(2) }} kg</p>
          </div>

          <div v-if="activity === 'cloud'" class="space-y-2">
            <p><strong>💻 CPU :</strong> {{ result.cpu_estimate?.co2e?.toFixed(4) }} kg</p>
            <p><strong>🧠 Mémoire :</strong> {{ result.memory_estimate?.co2e?.toFixed(4) }} kg</p>
            <p><strong>🏗️ Émissions incorporées :</strong> {{ result.embodied_cpu_estimate?.co2e?.toFixed(4) }} kg</p>
            <p><strong>⚙️ Instance :</strong> {{ result.calculation_details?.instance }} – {{ result.calculation_details?.vcpu_cores }} vCPU / {{ result.calculation_details?.instance_memory }} GB RAM</p>
          </div>

          <div v-if="activity === 'custom' && result.emission_factor">
            <p><strong>Facteur utilisé :</strong> {{ result.emission_factor.name }}</p>
            <p><strong>Source :</strong> {{ result.emission_factor.source }} ({{ result.emission_factor.year }})</p>
          </div>
        </div>
      </transition>
    </form>

    <!-- Historique -->
    <div v-if="recentResults.length" class="mt-8">
      <h3 class="text-xl font-bold mb-4">🕒 Derniers résultats</h3>
      <ul class="space-y-2">
        <li
          v-for="entry in recentResults"
          :key="entry.id"
          class="border border-gray-300 dark:border-gray-600 p-3 rounded bg-white dark:bg-noir text-noir dark:text-ivoire"
        >
          <p><strong>Activité :</strong> {{ entry.activity_type }}</p>
          <p><strong>CO₂ :</strong> {{ entry.co2e.toFixed(2) }} kg</p>
          <p class="text-sm text-gray-500">⏱️ {{ new Date(entry.created_at).toLocaleString() }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AVAILABLE_REGIONS,
  AVAILABLE_INSTANCES,
  AVAILABLE_STORAGE_TYPES,
  calculateCloud
} from '@/lib/cloud'

import { ref, watch } from 'vue'
import { supabase } from '@/lib/supabase'

const activity = ref('cloud')
const value = ref(100)
const origin = ref('Paris')
const destination = ref('Berlin')
const result = ref<any>(null)

const region = ref('us_west_2')
const instance = ref('t2.nano')
const duration = ref(24)
const storage = ref(10)
const storageType = ref<'ssd' | 'hdd'>('ssd')


watch(activity, () => {
  result.value = null
})

const calculate = async () => {
  result.value = null
  try {
    switch (activity.value) {
      case 'cloud':
        result.value = await calculateCloud(
          instance.value,
          region.value,
          duration.value,
          storage.value,
          storageType.value
        )
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

    await saveResultToSupabase(activity.value, extractCO2(result.value), result.value)
    await fetchRecentResults()
  } catch (e) {
    alert((e as Error).message)
  }
}


const extractCO2 = (data: any): number => {
  return data?.total_co2e ?? data?.co2e ?? 0
}

const saveResultToSupabase = async (type: string, co2e: number, raw: any) => {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
  .from('co2_results')
  .insert({
    user_id: user?.id,
    activity_type: type,
    co2e,
    raw_result: raw
  })

  if (error) {
    console.error('Erreur insertion Supabase :', error)
    alert("Erreur lors de l'enregistrement")
  }
}
const recentResults = ref<any[]>([])

const fetchRecentResults = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data, error } = await supabase
    .from('co2_results')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Erreur récupération historique :', error)
    return
  }

  recentResults.value = data
}


const calculateCloud = async (
  instance: string,
  region: string,
  duration: number,
  storage: number,
  storageType: 'ssd' | 'hdd' = 'ssd'
) => {
  // Appel pour les émissions de l'instance (CPU, RAM, embodied)
  const instanceResponse = await fetch('https://api.climatiq.io/compute/v1/aws/instance', {
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

  if (!instanceResponse.ok) {
    throw new Error('Erreur API instance : ' + instanceResponse.status)
  }

  const instanceData = await instanceResponse.json()

  // Appel pour les émissions liées au stockage
  const storageResponse = await fetch('https://api.climatiq.io/compute/v1/aws/storage', {
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

  if (!storageResponse.ok) {
    throw new Error('Erreur API stockage : ' + storageResponse.status)
  }

  const storageData = await storageResponse.json()

  // Fusion des résultats
  return {
    ...instanceData,
    storage_estimate: storageData,
  }
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
  const response = await fetch('https://api.climatiq.io/data/v1/estimate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CLIMATIQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emission_factor: {
        activity_id: 'electricity-supply_grid-source_residual_mix',
        data_version: '^3',
      },
      parameters: {
        energy: kwh,
        energy_unit: 'kWh',
      },
    }),
  })

  if (!response.ok) throw new Error('Erreur API électricité : ' + response.status)
  return await response.json()
}
</script>
