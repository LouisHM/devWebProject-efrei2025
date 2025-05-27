<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Calculateur CO₂</h2>
    <CO2Form />
  </div>
  <button>    <router-link to="/historique" class="text-blue-600 hover:underline">Voir l'historique</router-link>
  </button>
</template>

<script setup lang="ts">
import CO2Form from '@/components/CO2Form.vue'
</script>
