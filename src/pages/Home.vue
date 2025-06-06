<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
      <h1 class="text-3xl font-bold text-primary mb-6">Bienvenue sur CO2 Tracker</h1>
      <AuthForm />
    </div>
  </template>
  
  <script setup lang="ts">
  import AuthForm from '@/components/forms/AuthForm.vue'
  </script>
  