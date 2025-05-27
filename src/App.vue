<template>
  <div class="min-h-screen bg-light text-noir dark:bg-noir dark:text-light transition-colors duration-300">
    <header class="p-4 flex justify-between items-center border-b border-gray-300 dark:border-gray-600 bg-light dark:bg-noir">
      <h1 class="text-xl font-bold">🌍 CO2 Tracker</h1>
      <nav class="flex gap-4 items-center">
        <RouterLink to="/dashboard" class="hover:underline">Calcul</RouterLink>
        <RouterLink to="/historique" class="hover:underline">Historique</RouterLink>
        <RouterLink to="/stats" class="hover:underline">Graphiques</RouterLink>
      </nav>
      <div class="flex gap-4 items-center">
        <span v-if="user">{{ user.email }}</span>

        <button @click="toggleDark" class="px-3 py-1 border border-gray-400 dark:border-gray-500 rounded">
          {{ isDark ? '☀️' : '🌙' }}
        </button>

        <button
          v-if="user"
          @click="logout"
          class="px-3 py-1 border border-gray-400 dark:border-gray-500 rounded"
        >
          Déconnexion
        </button>
      </div>
    </header>

    <main class="p-4">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const isDark = ref(false)
const user = ref(null)
const router = useRouter()

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}

function toggleDark() {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  const system = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = saved === 'dark' || (!saved && system)
  applyTheme(isDark.value)

  supabase.auth.getSession().then(({ data }) => {
    user.value = data.session?.user ?? null
    if (user.value && router.currentRoute.value.name === 'home') {
      router.push('/dashboard')
    }
  })

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null
    if (session?.user) router.push('/dashboard')
    else router.push('/')
  })
})

const logout = async () => {
  await supabase.auth.signOut()
}
</script>
