<template>
  <div class="max-w-3xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-bold ">🕒 Historique de mes émissions</h1>

    <!-- Slider pour choisir combien d’entrées afficher dans le graphique -->
    <div v-if="!loading && results.length" class="space-y-2">
      <label for="displayCount" class="font-medium">
        Nombre de points graphiques : {{ displayCount }}
      </label>
      <input
        id="displayCount"
        type="range"
        min="0"
        :max="results.length"
        v-model.number="displayCount"
        class="w-full accent-primary"
      />
    </div>

    <!-- Graphique (affiché si displayCount > 0) -->
    <CO2BarChart
      v-if="displayCount > 0"
      :labels="chartResults.map(r => r.activity_type + ' - ' + new Date(r.created_at).toLocaleDateString())"
      :values="chartResults.map(r => r.co2e)"
    />

    <!-- États de chargement / pas de données -->
    <div v-if="loading">Chargement...</div>
    <div v-else-if="!loading && results.length === 0">Aucun résultat enregistré.</div>

    <!-- Liste complète (jusqu’à 50) -->
    <ul v-else class="space-y-4">
      <li
        v-for="entry in results"
        :key="entry.id"
        class=" p-4 rounded bg-white dark:bg-dark"
      >
        <p><strong>Activité :</strong> {{ entry.activity_type }}</p>
        <p><strong>CO₂ :</strong> {{ entry.co2e.toFixed(2) }} kg</p>
        <p class="text-sm text-gray-500">
          ⏱️ {{ new Date(entry.created_at).toLocaleString() }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import CO2BarChart from '@/components/charts/CO2BarChart.vue'

const results = ref<any[]>([])
const loading = ref(true)
const displayCount = ref(0)

const chartResults = computed(() => results.value.slice(0, displayCount.value))

const fetchUserResults = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    loading.value = false
    return
  }

  const { data, error } = await supabase
    .from('co2_results')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (!error && data) {
    results.value = data
    displayCount.value = data.length
  }
  loading.value = false
}

onMounted(fetchUserResults)
</script>
