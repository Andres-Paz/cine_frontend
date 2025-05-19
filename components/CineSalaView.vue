<template>
  <div class="flex flex-row w-full gap-8">
  <!-- Leyenda lateral -->
  <div
    v-if="is_selectable"
    class="w-48 shrink-0 space-y-4 text-left justify-self-start"
  >
    <h3 class="text-lg font-semibold">Leyenda</h3>
    <div class="flex items-center gap-2">
      <PanelBottom class="w-6 h-6 text-gray-400" /> <span>Disponibles</span>
    </div>
    <div class="flex items-center gap-2">
      <PanelBottom class="w-6 h-6 text-red-600" /> <span>Reservadas</span>
    </div>
    <div class="flex items-center gap-2">
      <PanelBottom class="w-6 h-6 text-blue-600" /> <span>Seleccionadas</span>
    </div>
    <div class="pt-4 text-sm">
      <span class="font-medium">Asientos:</span>
      {{ selectedSeats }} de {{ ticketsNum }}
    </div>
  </div>

  <!-- Zona central de butacas -->
  <div class="flex w-full items-center justify-center">
    <div class="w-fit justify-self-center items-center justify-center overflow-x-auto min-w-[300px]">
      <!-- Encabezado: Exit y Pantalla -->
      <div class="flex justify-between items-center w-full max-w-full px-4 mb-4 gap-4">
        <span class="text-sm font-medium text-gray-700">Exit</span>
        <div class="bg-slate-800 text-white text-center px-6 rounded w-full max-w-lg">Screen</div>
      </div>

      <!-- Contenedor de butacas con scroll horizontal -->
      <div>
        <div class="flex flex-col gap-3 items-center">
          <!-- Filas -->
          <div
            v-for="(fila) in filasArray"
            :key="fila"
            class="grid items-center gap-x-3"
            :style="{ gridTemplateColumns: '40px ' + 'repeat(' + columnas + ', 40px)' }"
          >
            <!-- Letra de la fila -->
            <div class="text-sm font-medium text-gray-700 sticky left-0 bg-white py-0.5">{{ fila }}</div>

            <!-- Butacas -->
            <div
              v-for="col in columnas"
              :key="fila + col"
              class="flex justify-center"
            >
              <PanelBottom
                class="w-6 h-6 cursor-pointer transition-colors"
                :class="seatColor(fila + col)"
                @click="toggleSeat(fila + col)"
              />
            </div>
          </div>

          <!-- Números de columna debajo -->
          <div
            class="grid mt-2 gap-x-3"
            :style="{ gridTemplateColumns: '40px ' + 'repeat(' + columnas + ', 40px)' }"
          >
            <div></div>
            <div
              v-for="col in columnas"
              :key="'header-' + col"
              class="text-center text-sm font-medium text-gray-600"
            >
              {{ col }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PanelBottom } from 'lucide-vue-next'

const newTickets = defineModel('new', {type: Array, default: []})
// Props
const props = defineProps({
  filas: {
    type: Number,
    required: true,
    default: 0
  },
  columnas: {
    type: Number,
    required: true,
    default: 0
  },
  is_selectable: {
    type: Boolean,
    required: true,
    default: false
  },
  ticketsNum: {
    type: Number,
    required: true,
    default: 0
  },
  tickets: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

//const selectedSeats = ref(0)
// Convertir número de filas a letras (A, B, C, ...)
const filasArray = computed(() => {
  return Array.from({ length: props.filas }, (_, i) =>
    String.fromCharCode(65 + i)
  )
})

// Métodos
const seatColor = (id) => {
  if (props.tickets.some((t) => t.butaca === id)) {
    return 'text-red-600 cursor-not-allowed'
  } else if (newTickets.value.some((t) => t.butaca === id)) {
    return 'text-blue-600' 
  } else {
    return 'text-gray-400'
  }
}


const toggleSeat = (id) => {
  if (!props.is_selectable) return

  const ticketIndex = newTickets.value.findIndex((t) => t.butaca === id)

  if (ticketIndex !== -1) {
    newTickets.value[ticketIndex].butaca = null
  } else {
    const emptyTicket = newTickets.value.find((t) => t.butaca === null)
    if (emptyTicket) {
      emptyTicket.butaca = id
    }
  }
}

const selectedSeats = computed(() => {
  let cont = 0
  for (const ticket of newTickets.value) {
    if (ticket.butaca) cont++
  }
  return cont
})

</script>

<style scoped>
/* Opcional: espacio entre filas más marcado */
.grid > div {
  margin-bottom: 4px;
}
</style>
