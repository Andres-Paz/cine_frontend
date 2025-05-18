<template>
    <header class="w-full bg-blue-600 text-white p-4 shadow-md flex justify-between items-center h-16">
        <div class="flex items-center gap-2">
            <component :is="currentIcon" class="w-6 h-6 text-white" />
            <h1 class="text-xl font-bold">{{ currentTitle }}</h1>
        </div>

        <div class="w-48" v-if="is_user">
            <select
                id="view"
                v-model="selected"
                class="w-full px-4 py-2 border cursor-pointer border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                @change="handleNavigation"   
            >
                <option value="cartelera" class="text-black">Cartelera</option>
                <option value="misTickets" class="text-black">Tickets</option>
                <option value="cerrarSesion" class="text-black">Cerrar sesion</option>
            </select>
        </div>
    </header>
</template>

<script setup>
import { useRoute} from 'vue-router'
import { Film, CalendarClock, TicketCheck } from 'lucide-vue-next'

const { logout } = useAuthStore()
 

const props = defineProps({
    is_user: {
        type: Boolean,
        requried: true,
        default: true,
    }
})
const route = useRoute()
const getRoute = (() => {
    if (route.name === 'mis-tickets') return 'misTickets'
    return 'cartelera'
})

const selected = ref(getRoute())

const currentTitle = computed(() => {
    if(props.is_user){
        if (route.name === 'mis-tickets') return 'Mis Tickets'
        if (route.name?.toString().includes('peliculas/') || route.params.peliculaId) return 'Funciones'
        if (route.name?.toString().includes('reservaciones/') || route.params.funcionId) return 'Reservaciones'
        return 'Cartelera'
    }
    else {
        if (route.name === 'peliculas') return 'Peliculas'
        if (route.name === 'cine-sala') return 'Salas de cine'
        if (route.name === 'funciones') return 'Funciones'
        if (route.name === 'usuarios') return 'Usuarios'
        return 'Peliculas'
    }
})

const currentIcon = computed(() => {
    if (route.name === 'misTickets') return TicketCheck
    if (route.name?.toString().includes('peliculas/') || route.params.peliculaId) return CalendarClock
    return Film
})

const handleNavigation = ()=> {
    if(selected.value === 'cartelera'){
        navigateTo('/peliculas')
    }
    if(selected.value === 'misTickets'){
        navigateTo('/mis-tickets')
    }
    if(selected.value === 'cerrarSesion'){
        logout()
        navigateTo('/login')
    }
}
</script>