<template>
  <div v-if="results.length" class="mt-8">
    <h3 class="text-xl font-bold mb-4">🕒 Derniers résultats</h3>
    <ul class="space-y-2">
      <li
        v-for="entry in results"
        :key="entry.id"
        class="border border-gray-300 dark:border-gray-600 p-3 rounded bg-white dark:bg-dark text-textlight dark:text-textdark"
      >
        <p><strong>Activité :</strong> {{ entry.activity_type }}</p>
        <p><strong>CO₂ :</strong> {{ entry.co2e.toFixed(2) }} kg</p>
        <p class="text-sm text-gray-500">
          ⏱️ {{ new Date(entry.created_at).toLocaleString() }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{ results: any[] }>()
</script>
