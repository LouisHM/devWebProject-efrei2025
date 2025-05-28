<template>
  <div class="min-h-screen bg-light text-noir dark:bg-noir dark:text-light transition-colors duration-300">
    <header class="flex items-center justify-between bg-light dark:bg-noir border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <h1 class="text-2xl font-extrabold">🌍 CO₂ Tracker</h1>
      <NavBar />
    </header>

    <main class="p-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import NavBar from '@/components/NavBar.vue'

// … le reste de ton setup (theme, auth, etc.)
</script>
