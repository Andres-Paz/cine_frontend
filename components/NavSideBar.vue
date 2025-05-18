<template>
  <aside class="w-[300px] h-screen bg-white border-r shadow flex flex-col">

    <div class="flex p-6 border-b gap-2 h-16 items-center">
      <h2 class="text-lg font-semibold">Usuario: </h2>
      <p class="text-gray-600">{{ username }}</p>
    </div>

    <nav class="flex-1 p-4 space-y-2 mt-6">
      <NuxtLink
        v-for="item in navItems"
        :key="item.label"
        class="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 text-left text-sm font-medium text-gray-700 cursor-pointer"
        :to="item.url"
      >
        <component :is="item.icon" class="w-5 h-5" />
        {{ item.label }}
      </NuxtLink>
    </nav>

    <div class="p-4 h-16">
      <button
        class="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 text-left text-sm font-medium text-red-600 cursor-pointer"
        @click="$emit('logout')"
      >
        <LogOut class="w-5 h-5" />
        Cerrar sesión
      </button>
    </div>
  </aside>
</template>

<script setup>
import {
  Film,
  Layout,
  CalendarClock,
  Users,
  LogOut,
} from 'lucide-vue-next'

const props = defineProps({
  username: {
    type: String,
    default: ''
  },
})

const navItems = [
  { label: 'Películas', icon: Film, url: '/peliculas' },
  { label: 'Salas', icon: Layout, url: '/cine-salas' },
  { label: 'Funciones', icon: CalendarClock, url: '/funciones' },
  { label: 'Usuarios', icon: Users, url: '/usuarios' },
]
</script>
