<template>
  <header class="bg-light dark:bg-noir border-b border-gray-300 dark:border-gray-600">
    <div class="max-w-4xl mx-auto flex items-center justify-between p-4">
      <!-- Logo / Titre -->
      <RouterLink to="/" class="flex items-center space-x-2">
        <span class="text-2xl">🌍</span>
        <span class="text-xl font-bold text-noir dark:text-white">CO₂ Tracker</span>
      </RouterLink>

      <!-- Bouton hamburger (mobile) -->
      <button
        @click="isOpen = !isOpen"
        class="md:hidden text-noir dark:text-white focus:outline-none"
        aria-label="Menu"
      >
        <span v-if="!isOpen" class="text-2xl">☰</span>
        <span v-else       class="text-2xl">✕</span>
      </button>

      <!-- Menu principal (desktop) -->
      <div class="hidden md:flex items-center space-x-4">
        <RouterLink
          to="/dashboard"
          class="px-4 py-2 rounded-full text-sm font-medium transition"
          :class="isActive('/dashboard')
            ? 'bg-secondary hover:bg-primary text-white'
            : 'text-noir dark:text-white hover:bg-primary dark:hover:bg-secondary-light'"
        >
          Calcul
        </RouterLink>
        <RouterLink
          to="/historique"
          class="px-4 py-2 rounded-full text-sm font-medium transition"
          :class="isActive('/historique')
            ? 'bg-secondary hover:bg-primary text-white'
            : 'text-noir dark:text-white hover:bg-primary dark:hover:bg-secondary-light'"
        >
          Historique
        </RouterLink>
        <RouterLink
          to="/stats"
          class="px-4 py-2 rounded-full text-sm font-medium transition"
          :class="isActive('/stats')
            ? 'bg-secondary hover:bg-primary text-white'
            : 'text-noir dark:text-white hover:bg-primary dark:hover:bg-secondary-light'"
        >
          Statistiques
        </RouterLink>

        <!-- Espace flexible pour laisser l’email et boutons à droite -->
        <div class="flex-1"></div>

        <!-- Email utilisateur -->
        <span v-if="user" class="text-sm font-medium text-noir dark:text-white">
          {{ user.email }}
        </span>

        <!-- Bouton Déconnexion -->
        <button
          v-if="user"
          @click="logout"
          class="px-3 py-1 flex items-center gap-1 rounded-md bg-secondary hover:bg-primary text-white text-sm font-medium transition"
        >
          <span>Déconnexion</span>
        </button>

        <!-- Toggle dark/light -->
        <button
          @click="toggleDark"
          class="px-3 py-1 rounded-full text-sm text-noir dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          aria-label="Toggle theme"
        >
          <span v-if="isDark">☀️ Light</span>
          <span v-else>🌙 Dark</span>
        </button>
      </div>
    </div>

    <!-- Menu mobile (déroulant) -->
    <transition name="slide-fade">
      <div
        v-if="isOpen"
        class="md:hidden bg-light dark:bg-noir border-t border-gray-200 dark:border-gray-700"
      >
        <ul class="flex flex-col space-y-2 p-4">
          <li>
            <RouterLink
              to="/dashboard"
              @click="closeMenu"
              class="block px-4 py-2 rounded-full text-sm font-medium transition"
              :class="isActive('/dashboard')
                ? 'bg-secondary hover:bg-primary text-white'
                : 'text-noir dark:text-white hover:bg-primary dark:hover:bg-secondary-light'"
            >
              Calcul
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/historique"
              @click="closeMenu"
              class="block px-4 py-2 rounded-full text-sm font-medium transition"
              :class="isActive('/historique')
                ? 'bg-secondary hover:bg-primary text-white'
                : 'text-noir dark:text-white hover:bg-primary dark:hover:bg-secondary-light'"
            >
              Historique
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/stats"
              @click="closeMenu"
              class="block px-4 py-2 rounded-full text-sm font-medium transition"
              :class="isActive('/stats')
                ? 'bg-secondary hover:bg-primary text-white'
                : 'text-noir dark:text-white hover:bg-primary dark:hover:bg-secondary-light'"
            >
              Statistiques
            </RouterLink>
          </li>

          <li v-if="user" class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <span class="block px-4 py-2 text-sm font-medium text-noir dark:text-white">
              {{ user.email }}
            </span>
            <button
              @click="logoutAndClose"
              class="w-full text-left px-4 py-2 mt-1 rounded-md bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white text-sm font-medium transition"
            >
              Déconnexion
            </button>
          </li>

          <li class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              @click="toggleDark"
              class="w-full text-left px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-noir dark:text-white text-sm font-medium transition"
            >
              {{ isDark ? '☀️ Light' : '🌙 Dark' }}
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { supabase } from "@/lib/supabase";

const router = useRouter();
const route = useRoute();

const isOpen = ref(false);
const isDark = ref(false);
const user = ref<any>(null);

function closeMenu() {
  isOpen.value = false;
}

function logoutAndClose() {
  supabase.auth.signOut();
  isOpen.value = false;
}

async function logout() {
  await supabase.auth.signOut();
  router.push("/");
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}
function toggleDark() {
  isDark.value = !isDark.value;
  applyTheme(isDark.value);
}

const isActive = (path: string) => route.path.startsWith(path);

onMounted(() => {
  const saved = localStorage.getItem("theme");
  const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
  isDark.value = saved === "dark" || (!saved && system);
  applyTheme(isDark.value);

  supabase.auth.getSession().then(({ data }) => {
    user.value = data.session?.user ?? null;
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null;
    if (!session?.user) {
      router.push("/");
    }
  });
});
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
