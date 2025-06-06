<template>
  <div class="space-y-4">
    <div>
      <label class="block font-semibold">Ville de départ :</label>
      <input
        :value="origin"
        @input="$emit('update:origin', $event.target.value)"
        type="text"
        required
        class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
      />
    </div>
    <div>
      <label class="block font-semibold">Ville d'arrivée :</label>
      <input
        :value="destination"
        @input="$emit('update:destination', $event.target.value)"
        type="text"
        required
        class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  origin: string
  destination: string
}>()
</script>
