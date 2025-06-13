<!-- src/components/AverageComparisonChart.vue -->
<template>
  <div class="space-y-6">
    <!-- Section "pills" centrée -->
    <div class="flex justify-center space-x-4 flex-wrap">
      <!-- Vols -->
      <label class="relative inline-flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          v-model="showCategories.flight"
          class="absolute opacity-0 w-0 h-0 peer"
        />
        <span
          class="
            px-4 py-1 rounded-full transition-colors duration-200
            bg-transparent border-2 border-blue-600 text-blue-600
            peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-transparent
            hover:bg-blue-100 dark:hover:bg-blue-900
            text-xs font-medium uppercase
          "
        >
          Vols
        </span>
      </label>

      <!-- Cloud -->
      <label class="relative inline-flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          v-model="showCategories.cloud"
          class="absolute opacity-0 w-0 h-0 peer"
        />
        <span
          class="
            px-4 py-1 rounded-full transition-colors duration-200
            bg-transparent border-2 border-green-600 text-green-600
            peer-checked:bg-green-600 peer-checked:text-white peer-checked:border-transparent
            hover:bg-green-100 dark:hover:bg-green-900
            text-xs font-medium uppercase
          "
        >
          Cloud
        </span>
      </label>

      <!-- Électricité -->
      <label class="relative inline-flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          v-model="showCategories.electricity"
          class="absolute opacity-0 w-0 h-0 peer"
        />
        <span
          class="
            px-4 py-1 rounded-full transition-colors duration-200
            bg-transparent border-2 border-yellow-500 text-yellow-500
            peer-checked:bg-yellow-500 peer-checked:text-white peer-checked:border-transparent
            hover:bg-yellow-100 dark:hover:bg-yellow-900
            text-xs font-medium uppercase
          "
        >
          Électricité
        </span>
      </label>

      <!-- Total -->
      <label class="relative inline-flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          v-model="showCategories.total"
          class="absolute opacity-0 w-0 h-0 peer"
        />
        <span
          class="
            px-4 py-1 rounded-full transition-colors duration-200
            bg-transparent border-2 border-purple-600 text-purple-600
            peer-checked:bg-purple-600 peer-checked:text-white peer-checked:border-transparent
            hover:bg-purple-100 dark:hover:bg-purple-900
            text-xs font-medium uppercase
          "
        >
          Total
        </span>
      </label>
    </div>

    <!-- Graphique à barres -->
    <div class="bg-white dark:bg-dark p-4 rounded-lg shadow-md">
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  flightTotal: number;
  cloudTotal: number;
  electricityTotal: number;
}>();

const FRANCE_AVERAGE = {
  flight: 1500,
  cloud: 800,
  electricity: 2500,
};

const userTotals = computed(() => ({
  flight: props.flightTotal,
  cloud: props.cloudTotal,
  electricity: props.electricityTotal,
  total: props.flightTotal + props.cloudTotal + props.electricityTotal,
}));

const franceTotals = computed(() => ({
  flight: FRANCE_AVERAGE.flight,
  cloud: FRANCE_AVERAGE.cloud,
  electricity: FRANCE_AVERAGE.electricity,
  total:
    FRANCE_AVERAGE.flight + FRANCE_AVERAGE.cloud + FRANCE_AVERAGE.electricity,
}));

const showCategories = ref({
  flight: true,
  cloud: true,
  electricity: true,
  total: true,
});

const allCategories = ["flight", "cloud", "electricity", "total"] as const;
type Cat = typeof allCategories[number];

const categoryLabels: Record<Cat, string> = {
  flight: "Vols",
  cloud: "Cloud",
  electricity: "Électricité",
  total: "Total",
};

const USER_COLORS: Record<Cat, string> = {
  flight: "#3b82f6", 
  cloud: "#10b981",
  electricity: "#f59e0b", 
  total: "#8b5cf6", 
};

const AVG_COLORS: Record<Cat, string> = {
  flight: "#93c5fd", 
  cloud: "#6ee7b7", 
  electricity: "#fde68a",
  total: "#d8b4fe",
};

const visibleCats = computed(() =>
  allCategories.filter((c) => showCategories.value[c])
);

const labels = computed(() => visibleCats.value.map((c) => categoryLabels[c]));

const dataUser = computed(() =>
  visibleCats.value.map((c) => userTotals.value[c])
);
const dataAvg = computed(() =>
  visibleCats.value.map((c) => franceTotals.value[c])
);

const userBarColors = computed(() =>
  visibleCats.value.map((c) => USER_COLORS[c])
);
const avgBarColors = computed(() =>
  visibleCats.value.map((c) => AVG_COLORS[c])
);

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
      text: "Comparaison des émissions par catégorie",
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
</style>
