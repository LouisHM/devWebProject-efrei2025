<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
)

const props = defineProps<{
  // liste d'objets contenant created_at: string/date, co2e: number
  data: { created_at: string; co2e: number }[]
}>()

// Regrouper par date (YYYY-MM-DD) et sommer
const aggregated = computed(() => {
  const map = new Map<string, number>()
  props.data.forEach(({ created_at, co2e }) => {
    const day = new Date(created_at).toISOString().slice(0, 10)
    map.set(day, (map.get(day) || 0) + co2e)
  })
  // tri par date croissante
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
})

// données pour Chart.js
const chartData = computed(() => ({
  labels: aggregated.value.map(([day]) => day),
  datasets: [
    {
      label: 'Émissions journalières (kg CO₂)',
      data: aggregated.value.map(([, sum]) => sum),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.4)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: "Tendance de mes émissions CO₂ sur le temps",
    },
  },
  scales: {
    x: {
      title: { display: true, text: 'Date' },
      ticks: { maxRotation: 45, minRotation: 45 },
    },
    y: {
      title: { display: true, text: 'kg CO₂' },
    },
  },
}
</script>
