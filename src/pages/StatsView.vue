<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-bold">📊 Statistiques</h1>

    <div v-if="loading" class="text-center">Chargement…</div>
    <div v-else-if="!hasData" class="text-center">Pas assez de données pour afficher les graphiques.</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Camembert -->
      <EmissionPieChart
        v-if="EmissionPieChart"
        :labels="pieLabels"
        :values="pieValues"
        class="bg-white dark:bg-noir p-4 rounded shadow"
      />

      <!-- Courbe temporelle -->
      <EmissionLineChart
        v-if="EmissionLineChart"
        :data="results"
        class="bg-white dark:bg-noir p-4 rounded shadow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { supabase } from '@/lib/supabase'

// ⚠️ Vérifie que ces fichiers existent exactement sous src/components/
import EmissionPieChart from '@/components/EmissionPieChart.vue'
import EmissionLineChart from '@/components/EmissionLineChart.vue'

interface Co2Result {
  activity_type: 'flight' | 'cloud' | 'custom'
  co2e: number
  created_at: string
}

const results = ref<Co2Result[]>([])
const loading = ref(true)

const fetchResults = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { loading.value = false; return }
  const { data, error } = await supabase
    .from('co2_results')
    .select('activity_type, co2e, created_at')
    .eq('user_id', user.id)
  if (!error && data) results.value = data as Co2Result[]
  loading.value = false
}

onMounted(fetchResults)

// Totaux par type pour le camembert
const sumByType = (type: Co2Result['activity_type']) =>
  results.value.filter(r => r.activity_type === type).reduce((a,r) => a + r.co2e, 0)

const flightTotal = computed(() => sumByType('flight'))
const cloudTotal  = computed(() => sumByType('cloud'))
const customTotal = computed(() => sumByType('custom'))

const pieLabels = ['Vols', 'Cloud', 'Électricité']
const pieValues = computed(() => [ flightTotal.value, cloudTotal.value, customTotal.value ])
const hasData   = computed(() => pieValues.value.reduce((a,v) => a+v, 0) > 0)
</script>
