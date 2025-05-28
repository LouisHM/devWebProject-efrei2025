<template>
  <div>
    <label class="block font-semibold">Quantité :</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      type="number"
      min="0"
      required
      class="w-full p-2 border rounded bg-white dark:bg-dark text-dark dark:text-light"
    />
    <p class="text-sm text-gray-500 mt-1">En kWh (kilowatt-heure)</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: number }>()
</script>
