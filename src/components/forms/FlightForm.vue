<!-- src/components/FlightForm.vue -->
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <!-- Origine -->
    <div>
      <label class="block font-semibold mb-1">Ville de départ</label>
      <input
        :value="origin"
        @input="$emit('update:origin', ($event.target as HTMLInputElement)?.value)"
        type="text"
        required
        placeholder="Ex : Paris"
        class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
      />
    </div>

    <!-- Destination -->
    <div>
      <label class="block font-semibold mb-1">Ville d'arrivée</label>
      <input
        :value="destination"
        @input="$emit('update:destination', ($event.target as HTMLInputElement)?.value)"
        type="text"
        required
        placeholder="Ex : Berlin"
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
