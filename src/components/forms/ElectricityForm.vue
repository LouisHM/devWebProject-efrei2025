<template>
  <div class="space-y-4">
    <!-- Région (obligatoire) -->
    <div>
      <label class="block font-semibold">Région <span class="text-red-500">*</span> :</label>
      <select
        :value="modelValue.region"
        @change="emit('update:modelValue', { ...modelValue, region: $event.target.value })"
        class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark text-dark dark:text-light"
      >
        <option disabled value="">Sélectionnez une région</option>
        <option
          v-for="opt in AVAILABLE_REGIONS"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>

    <!-- Année (optionnelle) -->
    <div>
      <label class="block font-semibold">Année (optionnelle) :</label>
      <input
        type="number"
        min="2000"
        max="2099"
        step="1"
        :value="modelValue.year ?? ''"
        @input="emit(
          'update:modelValue',
          {
            ...modelValue,
            year: $event.target.value === '' ? undefined : Number($event.target.value),
          }
        )"
        placeholder="(laisser vide pour dernière année disponible)"
        class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark text-dark dark:text-light"
      />
    </div>

    <!-- Quantité totale d’électricité (kWh) – obligatoire -->
    <div>
      <label class="block font-semibold">Quantité totale (kWh) <span class="text-red-500">*</span> :</label>
      <input
        type="number"
        min="0"
        :value="modelValue.amount"
        @input="emit(
          'update:modelValue',
          {
            ...modelValue,
            amount: Number($event.target.value),
          }
        )"
        required
        class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark text-dark dark:text-light"
      />
    </div>

    <!-- RECs (optionnel) -->
    <div>
      <label class="block font-semibold">RECs (kWh, optionnel) :</label>
      <input
        type="number"
        min="0"
        :value="modelValue.recs ?? ''"
        @input="emit(
          'update:modelValue',
          {
            ...modelValue,
            recs: $event.target.value === '' ? undefined : Number($event.target.value),
          }
        )"
        placeholder="laisser vide si non applicable"
        class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-dark text-dark dark:text-light"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { AVAILABLE_REGIONS, AVAILABLE_SOURCE_SETS } from '@/lib/electricity'
import type { ElectricityParams } from '@/lib/electricity'

// Declare that this component expects a `modelValue` of type `ElectricityParams`,
// and that it emits an 'update:modelValue' event carrying an ElectricityParams object.
defineProps<{ modelValue: ElectricityParams }>()
const emit = defineEmits<{ 'update:modelValue': ElectricityParams }>()
</script>
