<!-- src/components/EmissionPieChart.vue -->
<template>
  <Pie :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Enregistrement des plugins indispensables pour que <Pie> fonctionne
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps<{
  labels: string[];
  values: number[];
}>();

/*
  Couleurs codées en dur (tailwind hex) :
  - Vols      : #3b82f6 (bleu)
  - Cloud     : #10b981 (vert)
  - Électricité: #f59e0b (jaune)
  (Pour un 4ᵉ segment "Total" on pourrait ajouter #8b5cf6)
*/
const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      data: props.values,
      backgroundColor: PIE_COLORS.slice(0, props.values.length),
      hoverOffset: 6,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: { boxWidth: 12, padding: 16 },
    },
    title: {
      display: true,
      text: "Répartition de mes émissions par secteur (kg CO₂)",
    },
  },
};
</script>
