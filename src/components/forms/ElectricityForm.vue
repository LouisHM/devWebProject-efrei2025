<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Région (obligatoire) -->
      <div>
        <label class="block font-semibold mb-1">Région *</label>
        <select
          :value="modelValue.region"
          @change="updateField('region', ($event.target as HTMLSelectElement)?.value)"
          required
          class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
        >
          <!-- option par défaut interdite à la validation -->
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

      <!-- Année (facultatif) -->
      <div>
        <label class="block font-semibold mb-1">Année (optionnel)</label>
        <input
          :value="modelValue.year ?? ''"
          @input="updateField('year', ($event.target as HTMLInputElement)?.valueAsNumber || undefined)"
          type="number"
          min="2000"
          max="2100"
          placeholder="Ex : 2023"
          class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
        />
      </div>

      
      <div>
        <label class="block font-semibold mb-1">Quantité (kWh) *</label>
        <input
          :value="modelValue.amount"
          @input="updateField('amount', Number(($event.target as HTMLInputElement)?.value))"
          type="number"
          min="0"
          required
          placeholder="Ex : 500"
          class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
        />
      </div>

      
      <div>
        <label class="block font-semibold mb-1">RECs (optionnel, kWh)</label>
        <input
          :value="modelValue.recs ?? ''"
          @input="updateField('recs', ($event.target as HTMLInputElement)?.valueAsNumber || undefined)"
          type="number"
          min="0"
          placeholder="Ex : 100"
          class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AVAILABLE_REGIONS
} from '@/lib/electricity'
import type { ElectricityParams } from '@/lib/electricity'

const props = defineProps<{
  modelValue: ElectricityParams
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', payload: ElectricityParams): void
}>()

function updateField<Key extends keyof ElectricityParams>(
  field: Key,
  value: ElectricityParams[Key]
) {
  const newObj: ElectricityParams = {
    ...props.modelValue,
    [field]: value
  }
  emit('update:modelValue', newObj)
}
</script>
