<template>
  <div class="flex gap-6">
    <!-- Sidebar de leyenda -->
    <div v-if="is_selectable" class="w-48 space-y-4">
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
        {{ selectedSeats.length }} de {{ ticketsNum }}
      </div>
    </div>

    <div class="w-full">
      <!-- Encabezado: Screen y Exit -->
      <div class="flex justify-between items-center mb-4 gap-6">
        <span class="text-sm font-medium text-gray-700">Exit</span>
        <div class="bg-slate-800 text-white text-center w-full py-2 rounded">Screen</div>
      </div>

      <!-- Grid con filas y columnas -->
      <div class="grid gap-2 mt-16">
        <!-- Filas -->
        <div
          v-for="(fila, filaIndex) in filasArray"
          :key="fila"
          class="grid items-center"
          :style="{ gridTemplateColumns: '40px ' + '1fr '.repeat(columnas) }"
        >
          <!-- Letra de fila -->
          <div class="text-sm font-medium text-gray-700">{{ fila }}</div>

          <!-- Asientos -->
          <div
            v-for="col in columnas"
            :key="fila + col"
            class="flex justify-center"
          >
            <PanelBottom
              class="w-6 h-6 cursor-pointer"
              :class="seatColor(fila + col)"
              @click="toggleSeat(fila + col)"
            />
          </div>
        </div>
        <div class="grid" :style="{ gridTemplateColumns: '40px ' + '1fr '.repeat(columnas) }">
          <div></div>
          <div
            v-for="col in columnas"
            :key="'header-' + col"
            class="text-center text-xs font-medium text-gray-600"
          >
            {{ col }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PanelBottom } from 'lucide-vue-next'

// Props
const props = defineProps({
  filas: Number,
  columnas: Number,
  is_selectable: Boolean,
  ticketsNum: Number,
})

// Convertir número de filas a letras (A, B, C, ...)
const filasArray = computed(() => {
  return Array.from({ length: props.filas }, (_, i) =>
    String.fromCharCode(65 + i)
  )
})

// Refs
const selectedSeats = ref([])
const tickets = ref([
    {"butaca": 'A3'},
    {"butaca": 'A4'},
])

// Métodos
const seatColor = (id) => {
  if (tickets.value.some((t) => t.butaca === id)) {
    return 'text-red-600 cursor-not-allowed'
  } else if (selectedSeats.value.includes(id)) {
    return 'text-blue-600'
  } else {
    return 'text-gray-400'
  }
}

const toggleSeat = (id) => {
  if (!props.is_selectable) return
  if (tickets.value.some((t) => t.butaca === id)) return

  const idx = selectedSeats.value.indexOf(id)
  if (idx !== -1) {
    selectedSeats.value.splice(idx, 1)
  } else if (selectedSeats.value.length < props.ticketsNum) {
    selectedSeats.value.push(id)
  }
}
</script>

<style scoped>
/* Opcional: espacio entre filas más marcado */
.grid > div {
  margin-bottom: 4px;
}
</style>
