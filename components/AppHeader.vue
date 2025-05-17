<template>
    <header class="w-full bg-blue-600 text-white p-4 shadow-md flex justify-between items-center h-16">
        <div class="flex items-center gap-2">
            <component :is="currentIcon" class="w-6 h-6 text-white" />
            <h1 class="text-xl font-bold">{{ currentTitle }}</h1>
        </div>

        <div class="w-48">
            <select
                id="view"
                v-model="selected"
                class="w-full px-4 py-2 border cursor-pointer border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="cartelera" class="text-black cursor-pointer">Cartelera</option>
                <option value="funciones" class="text-black cursor-pointer">Funciones</option>
                <option value="reservaciones" class="text-black cursor-pointer">Reservaciones</option>
            </select>
        </div>
    </header>
</template>

<script setup>
import { useRoute} from 'vue-router'
import { Film, CalendarClock, TicketCheck } from 'lucide-vue-next'
//import { useAuthStore } from '@/store/auth'

const route = useRoute()

const selected = ref('cartelera')

const currentTitle = computed(() => {
    if (route.name === 'reservaciones') return 'Reservaciones'
    if (route.name?.toString().includes('pelicula') || route.params.peliculaId) return 'Funciones'
    return 'Cartelera'
})

const currentIcon = computed(() => {
    if (route.name === 'reservaciones') return TicketCheck
    if (route.name?.toString().includes('pelicula') || route.params.peliculaId) return CalendarClock
    return Film
})
</script>