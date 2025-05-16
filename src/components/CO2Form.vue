<template>
    <form @submit.prevent="calculate">
      <div class="grid gap-4 mb-4">
        <label class="flex flex-col">
          Type d'activité :
          <select v-model="activity" class="border p-2 rounded">
            <option value="cloud">Cloud computing</option>
            <option value="flight">Vol aérien</option>
            <option value="custom">Activité personnalisée</option>
          </select>
        </label>
  
        <label class="flex flex-col">
          Quantité (ex. heures, km, etc.) :
          <input v-model.number="value" type="number" min="0" class="border p-2 rounded" required />
        </label>
      </div>
  
      <button type="submit" class="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition">
        Calculer
      </button>
  
      <div v-if="result" class="mt-6 p-4 border rounded bg-white text-noir dark:bg-noir dark:text-ivoire">
        <h3 class="text-lg font-semibold">Résultat</h3>
        <p><strong>CO₂ émis :</strong> {{ result.co2e.toFixed(2) }} kgCO₂e</p>
        <p><strong>Source :</strong> {{ result.emission_factor.name }}</p>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { getCO2Estimate } from '@/lib/climatiq'
  
  const activity = ref('cloud')
  const value = ref(1)
  const result = ref<any>(null)
  
  const calculate = async () => {
    let activityId = ''
    let parameters: any = {}
  
    switch (activity.value) {
      case 'cloud':
        activityId = 'compute_ec2_instance_t2_micro'
        parameters = { hours: value.value }
        break
      case 'flight':
        activityId = 'passenger_flight_domestic' // exemple
        parameters = { distance: value.value, distance_unit: 'km' }
        break
      case 'custom':
        activityId = 'electricity_energy_source_grid_mix' // ex : usage élec
        parameters = { energy: value.value, energy_unit: 'kWh' }
        break
    }
  
    try {
      result.value = await getCO2Estimate(activityId, parameters)
    } catch (e) {
      alert((e as Error).message)
    }
  }
  </script>
  