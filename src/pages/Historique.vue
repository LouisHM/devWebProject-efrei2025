<template>
    <div class="max-w-3xl mx-auto p-6 space-y-6">
      <h1 class="text-2xl font-bold">🕒 Historique de mes émissions</h1>
      
      <CO2BarChart
        v-if="results.length"
        :labels="results.map(r => r.activity_type + ' - ' + new Date(r.created_at).toLocaleDateString())"
        :values="results.map(r => r.co2e)"
        />

  
      <div v-if="loading">Chargement...</div>
      <div v-else-if="results.length === 0">Aucun résultat enregistré.</div>
  
      <ul v-else class="space-y-4">
        <li v-for="entry in results" :key="entry.id" class="border p-4 rounded bg-white dark:bg-noir">
          <p><strong>Activité :</strong> {{ entry.activity_type }}</p>
          <p><strong>CO₂ :</strong> {{ entry.co2e.toFixed(2) }} kg</p>
          <p class="text-sm text-gray-500">⏱️ {{ new Date(entry.created_at).toLocaleString() }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabase'
  import CO2BarChart from '@/components/CO2BarChart.vue'

  
  const results = ref<any[]>([])
  const loading = ref(true)
  
  const fetchUserResults = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
  
    const { data, error } = await supabase
      .from('co2_results')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)
  
    if (!error) results.value = data
    loading.value = false
  }
  
  onMounted(() => {
    fetchUserResults()
  })
  </script>
  