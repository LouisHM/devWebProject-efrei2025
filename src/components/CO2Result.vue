<template>
  <div
    class="mt-6 p-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark text-textlight dark:text-textdark space-y-4 shadow-md"
  >
    <h3 class="text-2xl font-bold mb-2">🎯 Résultat</h3>

    <!-- Total CO₂ -->
    <p v-if="result.total_co2e">
      <strong>💨 CO₂ total :</strong> {{ result.total_co2e.toFixed(4) }} kg
    </p>
    <p v-else-if="result.co2e">
      <strong>💨 CO₂ émis :</strong> {{ result.co2e.toFixed(4) }} kg
    </p>

    <!-- Vol -->
    <div v-if="activity === 'flight'">
      <p><strong>✈️ Distance :</strong> {{ result.distance_km?.toFixed(1) }} km</p>
      <p><strong>🔹 Direct :</strong> {{ result.direct_emissions?.co2e?.toFixed(2) }} kg</p>
      <p><strong>🔸 Indirect :</strong> {{ result.indirect_emissions?.co2e?.toFixed(2) }} kg</p>
    </div>

    <!-- Cloud -->
    <div v-if="activity === 'cloud'" class="space-y-2">
      <p><strong>💻 CPU :</strong> {{ result.cpu_estimate?.co2e?.toFixed(4) }} kg</p>
      <p><strong>🧠 Mémoire :</strong> {{ result.memory_estimate?.co2e?.toFixed(4) }} kg</p>
      <p><strong>🏗️ Embodied :</strong> {{ result.embodied_cpu_estimate?.co2e?.toFixed(4) }} kg</p>
      <p v-if="result.storage_estimate">
        <strong>💾 Stockage :</strong> {{ result.storage_estimate.co2e.toFixed(4) }} kg
      </p>
      <p class="text-sm">
        <strong>⚙️ Instance :</strong>
        {{ result.calculation_details?.instance }} –
        {{ result.calculation_details?.vcpu_cores }} vCPU /
        {{ result.calculation_details?.instance_memory }} GB RAM
      </p>
    </div>

    <!-- Électricité -->
    <div v-if="activity === 'custom' && result.emission_factor">
      <p><strong>🔌 Électricité :</strong> {{ result.co2e.toFixed(4) }} kg</p>
      <p>
        <strong>Facteur :</strong> {{ result.emission_factor.name }}
        ({{ result.emission_factor.year }})
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  result: any
  activity: 'cloud' | 'flight' | 'custom'
}>()
</script>
