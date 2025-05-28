<template>
  <div class="flex items-center space-x-4">
    <!-- Navigation links -->
    <nav class="flex space-x-2">
      <RouterLink
        to="/dashboard"
        class="px-4 py-2 rounded-full text-sm font-medium transition "
        :class="isActive('/dashboard')
          ? 'bg-secondary hover:bg-primary text-white'
          : 'text-noir dark:text-light hover:bg-primary dark:hover:bg-secondary-light'"
      >
        Calcul
      </RouterLink>
      <RouterLink
        to="/historique"
        class="px-4 py-2 rounded-full text-sm font-medium transition "
        :class="isActive('/historique')
          ? 'bg-secondary hover:bg-primary text-white'
          : 'text-noir dark:text-light hover:bg-primary dark:hover:bg-secondary-light'"
      >
        Historique
      </RouterLink>
      <RouterLink
        to="/stats"
        class="px-4 py-2 rounded-full text-sm font-medium transition"
        :class="isActive('/stats')
          ? 'bg-secondary hover:bg-primary text-white'
          : 'text-noir dark:text-light hover:bg-primary dark:hover:bg-secondary-light'"
      >
        Graphiques
      </RouterLink>
    </nav>

    <!-- User email -->


    <!-- Logout -->
    <button
      v-if="user"
      @click="logout"
      class="px-3 py-1 flex flex-row gap-1 rounded-md bg-secondary hover:bg-primary text-white text-sm font-medium hover:bg-secondary-dark transition"
    >
        <span v-if="user" class="">{{ user.email }} |</span>
        <span class="">Déconnexion</span>
        
    </button>
            <!-- Theme toggle -->
    <button
      @click="toggleDark"
      class="flex flex-col p-2 rounded-full text-sm"
      aria-label="Toggle theme"
    >
      <span v-if="isDark">Light theme ☀️</span>
      <span v-else>Dark theme 🌙</span>
    </button>
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { supabase } from '@/lib/supabase'

const router = useRouter()
const route = useRoute()

// User session
const user = ref<any>(null)

// Theme
const isDark = ref(false)
function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}
function toggleDark() {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
}

// Check if link is active
const isActive = (path: string) => route.path.startsWith(path)

// Logout
const logout = async () => {
  await supabase.auth.signOut()
  router.push('/')
}

onMounted(() => {
  // Initialize theme
  const saved = localStorage.getItem('theme')
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = saved === 'dark' || (!saved && system)
  applyTheme(isDark.value)

  // Initialize user
  supabase.auth.getSession().then(({ data }) => {
    user.value = data.session?.user ?? null
  })
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
  })
})
</script>
