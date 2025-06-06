<!-- src/pages/StatsView.vue -->
<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <h1 class="text-2xl font-bold">Statistiques 📊 </h1>

    <div v-if="loading" class="text-center">Chargement…</div>
    <div v-else-if="!hasData" class="text-center">
      Pas assez de données pour afficher les graphiques.
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-6">
      <!-- Camembert (Pie Chart) -->
      <div class="w-full lg:w-1/3 bg-white dark:bg-dark p-4 rounded shadow flex justify-center items-center">
        <div class="w-full" style="max-width: 100%; aspect-ratio: 1 / 1;">
          <EmissionPieChart :labels="pieLabels" :values="pieValues" />
        </div>
      </div>

      <!-- Courbe d’évolution (Line Chart) -->
      <div class="w-full lg:w-2/3 bg-white dark:bg-dark p-4 rounded shadow">
        <div class="w-full h-64">
          <EmissionLineChart :data="results" />
        </div>
      </div>
    </div>

    <!-- Comparaison vs Moyenne France -->
    <div class="bg-white dark:bg-dark p-4 rounded shadow">
      <AverageComparisonChart
        :flight-total="flightTotal"
        :cloud-total="cloudTotal"
        :electricity-total="electricityTotal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { supabase } from "@/lib/supabase";
import EmissionPieChart from "@/components/charts/EmissionPieChart.vue";
import EmissionLineChart from "@/components/charts/EmissionLineChart.vue";
import AverageComparisonChart from "@/components/charts/AverageComparisonChart.vue";

interface Co2Result {
  activity_type: "flight" | "cloud" | "electricity";
  co2e: number;
  created_at: string;
}

const results = ref<Co2Result[]>([]);
const loading = ref(true);

const fetchResults = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    loading.value = false;
    return;
  }
  const { data, error } = await supabase
    .from("co2_results")
    .select("activity_type, co2e, created_at")
    .eq("user_id", user.id);
  if (!error && data) results.value = data as Co2Result[];
  loading.value = false;
};
onMounted(fetchResults);

const sumByType = (type: Co2Result["activity_type"]) =>
  results.value
    .filter((r) => r.activity_type === type)
    .reduce((a, r) => a + r.co2e, 0);

const flightTotal = computed(() => sumByType("flight"));
const cloudTotal = computed(() => sumByType("cloud"));
const electricityTotal = computed(() => sumByType("electricity"));

const pieLabels = ["Vols", "Cloud", "Électricité"];
const pieValues = computed(() => [
  flightTotal.value,
  cloudTotal.value,
  electricityTotal.value,
]);
const hasData = computed(() =>
  pieValues.value.reduce((acc, v) => acc + v, 0) > 0
);
</script>
