<!-- src/components/CO2Result.vue -->
<template>
  <div class="mt-6 p-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark text-dark dark:text-light space-y-2 shadow-md">
    <h3 class="text-2xl font-bold mb-4">🎯 Résultat</h3>

    <!-- Cloud et Flight restent inchangés -->
    <div v-if="activity === 'cloud'">
      <p><strong>💻 CPU :</strong> {{ result.cpu_estimate?.co2e?.toFixed(4) }} kg</p>
      <p><strong>🧠 Mémoire :</strong> {{ result.memory_estimate?.co2e?.toFixed(4) }} kg</p>
      <p><strong>🏗️ Émissions incorporées :</strong> {{ result.embodied_cpu_estimate?.co2e?.toFixed(4) }} kg</p>
      <p>
        <strong>⚙️ Instance :</strong>
        {{ result.calculation_details?.instance }}
        – {{ result.calculation_details?.vcpu_cores }} vCPU /
        {{ result.calculation_details?.instance_memory }} GB RAM
      </p>
    </div>

    <div v-else-if="activity === 'flight'">
      <p><strong>Distance parcourue :</strong> {{ result.distance_km?.toFixed(1) }} km</p>
      <p><strong>Émissions directes :</strong> {{ result.direct_emissions?.co2e?.toFixed(2) }} kg</p>
      <p><strong>Émissions indirectes :</strong> {{ result.indirect_emissions?.co2e?.toFixed(2) }} kg</p>
    </div>

    <!-- ELECTRICITY: nouvelle branche dédiée -->
    <div v-else-if="activity === 'electricity'" class="space-y-3">
      <!-- On affiche en priorité l’approche “location” (scope 2) -->
      <div>
        <h4 class="font-semibold">📍 Approche “Location” (consommation locale)</h4>
        <p>
          <strong>Consommation (kg CO₂e) :</strong>
          {{ result.location.consumption.co2e.toFixed(2) }} kg
        </p>
        <p>
          <strong>Transmission & Distribution (kg CO₂e) :</strong>
          {{ result.location.transmission_and_distribution.co2e.toFixed(2) }} kg
        </p>
        <p>
          <strong>Fourniture en amont (well-to-tank, kg CO₂e) :</strong>
          {{ result.location.well_to_tank.co2e.toFixed(2) }} kg
        </p>
        <p>
          <strong>WTT T&D (kg CO₂e) :</strong>
          {{ result.location.well_to_tank_of_transmission_and_distribution.co2e.toFixed(2) }} kg
        </p>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Méthode de calcul : {{ result.location.consumption.co2e_calculation_method }}
        </p>
      </div>

      <!-- Affichage “market” (approche achat) -->
      <div>
        <h4 class="font-semibold">🛒 Approche “Market” (achats)</h4>
        <p>
          <strong>Consommation achetée (kg CO₂e) :</strong>
          {{ result.market.consumption.co2e.toFixed(2) }} kg
        </p>
        <p>
          <strong>Transmission & Distribution (kg CO₂e) :</strong>
          {{ result.market.transmission_and_distribution.co2e.toFixed(2) }} kg
        </p>
        <p>
          <strong>Fourniture en amont (well-to-tank, kg CO₂e) :</strong>
          {{ result.market.well_to_tank.co2e.toFixed(2) }} kg
        </p>
        <p>
          <strong>WTT T&D (kg CO₂e) :</strong>
          {{ result.market.well_to_tank_of_transmission_and_distribution.co2e.toFixed(2) }} kg
        </p>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Méthode de calcul : {{ result.market.consumption.co2e_calculation_method }}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'


const props = defineProps<{
  result: any
  activity: 'cloud' | 'flight' | 'electricity'
}>()
</script>

<style scoped>
h4 {
  margin-bottom: 0.25rem;
  color: #374151; 
}
.dark h4 {
  color: #d1d5db; 
}
</style>
