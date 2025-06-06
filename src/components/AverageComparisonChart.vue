<!-- src/components/AverageComparisonChart.vue -->
<template>
  <div class="space-y-4">
    <!-- Cases à cocher pour afficher/cacher chaque catégorie -->
    <div class="flex flex-wrap gap-4">
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="showCategories.flight"
          class="form-checkbox h-4 w-4 text-blue-500"
        />
        <span class="ml-2 text-sm">Vols</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="showCategories.cloud"
          class="form-checkbox h-4 w-4 text-green-500"
        />
        <span class="ml-2 text-sm">Cloud</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="showCategories.custom"
          class="form-checkbox h-4 w-4 text-yellow-500"
        />
        <span class="ml-2 text-sm">Électricité</span>
      </label>
      <label class="inline-flex items-center">
        <input
          type="checkbox"
          v-model="showCategories.total"
          class="form-checkbox h-4 w-4 text-purple-500"
        />
        <span class="ml-2 text-sm">Total</span>
      </label>
    </div>

    <div class="bg-white dark:bg-dark p-4 rounded shadow">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// On enregistre tout ce qu'il faut pour <Bar>
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  flightTotal: number;
  cloudTotal: number;
  customTotal: number;
}>();

// Moyennes France codées en dur (en kg CO₂)
const FRANCE_AVERAGE = {
  flight: 1500,
  cloud: 800,
  custom: 2500,
};

const userTotals = computed(() => ({
  flight: props.flightTotal,
  cloud: props.cloudTotal,
  custom: props.customTotal,
  total: props.flightTotal + props.cloudTotal + props.customTotal,
}));

const franceTotals = computed(() => ({
  flight: FRANCE_AVERAGE.flight,
  cloud: FRANCE_AVERAGE.cloud,
  custom: FRANCE_AVERAGE.custom,
  total: FRANCE_AVERAGE.flight + FRANCE_AVERAGE.cloud + FRANCE_AVERAGE.custom,
}));

// Cases cochées
const showCategories = ref({
  flight: true,
  cloud: true,
  custom: true,
  total: true,
});

const allCategories = ["flight", "cloud", "custom", "total"] as const;
type Cat = typeof allCategories[number];

// Labels pour l’axe X
const categoryLabels: Record<Cat, string> = {
  flight: "Vols",
  cloud: "Cloud",
  custom: "Électricité",
  total: "Total",
};

// Couleurs codées en dur (hex) pour l’utilisateur
const USER_COLORS: Record<Cat, string> = {
  flight: "#3b82f6", // bleu
  cloud: "#10b981",  // vert
  custom: "#f59e0b", // jaune
  total: "#8b5cf6",  // violet
};

// Couleurs “moyennes France” codées en dur (teintes plus claires)
const AVG_COLORS: Record<Cat, string> = {
  flight: "#93c5fd",     // bleu clair
  cloud: "#6ee7b7",      // vert clair
  custom: "#fde68a",     // jaune clair
  total: "#d8b4fe",      // violet clair
};

// On ne garde que les catégories cochées
const visibleCats = computed(() =>
  allCategories.filter((c) => showCategories.value[c])
);

// Étiquettes X
const labels = computed(() => visibleCats.value.map((c) => categoryLabels[c]));

// Données utilisateur et moyenne France
const dataUser = computed(() => visibleCats.value.map((c) => userTotals.value[c]));
const dataAvg = computed(() => visibleCats.value.map((c) => franceTotals.value[c]));

// Couleurs pour chaque série
const userBarColors = computed(() => visibleCats.value.map((c) => USER_COLORS[c]));
const avgBarColors = computed(() => visibleCats.value.map((c) => AVG_COLORS[c]));

// Construction des données Chart.js
const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: "Utilisateur",
      data: dataUser.value,
      backgroundColor: userBarColors.value,
    },
    {
      label: "Moyenne France",
      data: dataAvg.value,
      backgroundColor: avgBarColors.value,
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
      text: "Comparaison de mes émissions par catégorie avec la moyenne France",
    },
    tooltip: { mode: "index" as const, intersect: false },
  },
  scales: {
    x: {
      title: { display: true, text: "Catégories" },
      stacked: false,
    },
    y: {
      title: { display: true, text: "kg CO₂" },
      beginAtZero: true,
      stacked: false,
    },
  },
};
</script>

<style scoped>
/* Pas de styles particuliers, tout est géré en dur dans le script */
</style>
