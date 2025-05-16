<template>
  <div :class="{ 'dark': darkMode }">
    <div class="min-h-screen bg-ivoire text-noir dark:bg-noir dark:text-ivoire transition-colors duration-300">
      <header class="p-4 flex justify-between items-center border-b dark:border-ivoire">
        <h1 class="text-xl font-bold">🌍 CO2 Tracker</h1>
        <div class="flex gap-4 items-center">
          <span v-if="user">{{ user.email }}</span>
          <button @click="toggleDark" class="px-3 py-1 border rounded">
            {{ darkMode ? '☀️' : '🌙' }}
          </button>
          <button @click="logout" class="px-3 py-1 border rounded">
            Déconnexion
          </button>

        </div>
      </header>

      <main class="p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">

  import { ref, onMounted } from 'vue'
  import { supabase } from '@/lib/supabase'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const darkMode = ref(false)
  const user = ref(null)

  onMounted(() => {
    darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches

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


  function toggleDark() {
    darkMode.value = !darkMode.value
  }
</script>

