<template>
  <div class="min-h-screen bg-light text-noir dark:bg-noir dark:text-light transition-colors duration-300">
    <NavBar />

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

</script>
