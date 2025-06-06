<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <!-- Durée -->
    <div>
      <label class="block font-semibold mb-1">Durée (h)</label>
      <input
        :value="duration"
        @input="$emit('update:duration', Number($event.target.value))"
        type="number"
        min="1"
        required
        class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
      />
    </div>

    <!-- Stockage -->
    <div>
      <label class="block font-semibold mb-1">Stockage (Go)</label>
      <input
        :value="storage"
        @input="$emit('update:storage', Number($event.target.value))"
        type="number"
        min="0"
        required
        class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
      />
    </div>

    <!-- Instance -->
    <div>
      <label class="block font-semibold mb-1">Type d'instance</label>
      <select
        :value="instance"
        @change="$emit('update:instance', $event.target.value)"
        class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
      >
        <option
          v-for="opt in AVAILABLE_INSTANCES"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>

    <!-- Région -->
    <div>
      <label class="block font-semibold mb-1">Région</label>
      <select
        :value="region"
        @change="$emit('update:region', $event.target.value)"
        class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
      >
        <option
          v-for="opt in AVAILABLE_REGIONS"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>

    <!-- Type de stockage Occupe toute la largeur sur sm+ -->
    <div class="sm:col-span-2">
      <label class="block font-semibold mb-1">Type de stockage</label>
      <select
        :value="storageType"
        @change="$emit('update:storageType', $event.target.value)"
        class="w-full p-2 border rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-textlight dark:text-textdark"
      >
        <option
          v-for="opt in AVAILABLE_STORAGE_TYPES"
          :key="opt.value"
          :value="opt.value"
        >
          {{ opt.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AVAILABLE_REGIONS,
  AVAILABLE_INSTANCES,
  AVAILABLE_STORAGE_TYPES
} from '@/lib/cloud'

defineProps<{
  duration: number
  instance: string
  region: string
  storage: number
  storageType: 'ssd' | 'hdd'
}>()
</script>
