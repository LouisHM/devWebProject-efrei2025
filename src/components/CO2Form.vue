<template>
  <div class="max-w-2xl mx-auto p-6">
    <form
      @submit.prevent="calculate"
      class="space-y-6 bg-white dark:bg-dark text-dark dark:text-light rounded-lg p-6 dark:shadow-secondary"
    >       <!-- Sélection du type d'activité -->
      <div>
        <label class="block font-semibold">Type d'activité :</label>
        <select
          v-model="activity"
          class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark text-dark dark:text-light"
        >
          <option value="cloud">Cloud (instance AWS)</option>
          <option value="flight">Vol (ville → ville)</option>
          <option value="custom">Électricité (résiduelle)</option>
        </select>
      </div>

      <!-- Sous-formulaires -->
      <CloudForm
        v-if="activity === 'cloud'"
        v-model:duration="duration"
        v-model:instance="instance"
        v-model:region="region"
        v-model:storage="storage"
        v-model:storageType="storageType"
      />

      <FlightForm
        v-if="activity === 'flight'"
        v-model:origin="origin"
        v-model:destination="destination"
      />

      <ElectricityForm
        v-if="activity === 'custom'"
        v-model="value"
      />

      <!-- Bouton -->
      <div class="pt-4">
        <button
          class="bg-secondary hover:bg-primary text-white font-semibold px-4 py-2 rounded shadow transition duration-300 ease-in-out transform hover:scale-105"
        >
          Calculer
        </button>
      </div>

      <!-- Résultat -->
      <transition name="fade" mode="out-in">
        <CO2Result
          v-if="result"
          :result="result"
          :activity="activity"
        />
      </transition>
    </form>

    <!-- Historique -->
    <RecentResults :results="recentResults" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import CloudForm from './CloudForm.vue'
import FlightForm from './FlightForm.vue'
import ElectricityForm from './ElectricityForm.vue'
import CO2Result from './CO2Result.vue'
import RecentResults from './RecentResults.vue'

import {
  AVAILABLE_REGIONS,
  AVAILABLE_INSTANCES,
  AVAILABLE_STORAGE_TYPES,
} from '@/lib/cloud'
import {
  calculateCloud,
  calculateFlight,
  calculateElectricity,
} from '@/lib/cloud'
import { supabase } from '@/lib/supabase'

const activity = ref<'cloud'|'flight'|'custom'>('cloud')

// Cloud params
const duration = ref(24)
const instance = ref('t2.nano')
const region = ref('us_west_2')
const storage = ref(10)
const storageType = ref<'ssd'|'hdd'>('ssd')

// Flight params
const origin = ref('Paris')
const destination = ref('Berlin')

// Custom electricity
const value = ref(100)

const result = ref<any>(null)
const recentResults = ref<any[]>([])

// Efface le résultat si on change d’activité
watch(activity, () => {
  result.value = null
})

// Récupère l’historique
const fetchRecent = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data, error } = await supabase
    .from('co2_results')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)
  if (!error) recentResults.value = data
}
onMounted(fetchRecent)

const extractCO2 = (d: any) => d?.total_co2e ?? d?.co2e ?? 0

const calculate = async () => {
  result.value = null
  try {
    if (activity.value === 'cloud') {
      result.value = await calculateCloud(
        instance.value,
        region.value,
        duration.value,
        storage.value,
        storageType.value
      )
    } else if (activity.value === 'flight') {
      result.value = await calculateFlight(origin.value, destination.value)
    } else {
      result.value = await calculateElectricity(value.value)
    }

    // Sauvegarde et refresh historique
    const { data: { user } } = await supabase.auth.getUser()
    await supabase
      .from('co2_results')
      .insert({
        user_id: user?.id,
        activity_type: activity.value,
        co2e: extractCO2(result.value),
        raw_result: result.value,
      })
    await fetchRecent()
  } catch (e) {
    alert((e as Error).message)
  }
}
</script>
