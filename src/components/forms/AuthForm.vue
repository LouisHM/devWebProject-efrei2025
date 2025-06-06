<template>
    <div class="flex flex-col items-center gap-4">
      <h2 class="text-xl font-semibold">Connexion</h2>
      <button
        @click="signInWithProvider('google')"
        class="px-4 py-2 text-light border rounded bg-secondary hover:bg-primary hover:text-white transition"
      >
        Se connecter avec Google
      </button>
      <button
        @click="signInWithProvider('azure')"
        class="px-4 py-2 bg-white text-noir rounded hover:bg-primary hover:text-white transition"
      >
        Se connecter avec Microsoft
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { supabase } from '@/lib/supabase'
  
  const signInWithProvider = async (provider: 'google' | 'azure') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin,
      },
    })
    if (error) console.error(error.message)
  }
  </script>
  