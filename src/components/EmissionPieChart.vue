<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps<{
  labels: string[]
  values: number[]
}>()

// Données réactives du camembert
const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.values,
      backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'], // bleu, vert, jaune
      hoverOffset: 6,
    },
  ],
}))

// Options du graphique
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        padding: 16,
      },
    },
    title: {
      display: true,
      text: 'Répartition des émissions (kg CO₂)',
      font: { size: 16 },
    },
  },
}
</script>
