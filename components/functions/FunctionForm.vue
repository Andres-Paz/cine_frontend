<template>
  <Dialog v-model:open="isOpen" :titulo="edit ? 'Modificar funcion' : 'Crear funcion'"
    :aceptar-text="edit ? 'Modificar' : 'Crear'" @aceptar="onAceptar" @cancelar="onCancelar">
    <form class="space-y-4">
      <!-- Fecha -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
        <input type="date" v-model="functionData.fecha" :min="minDate"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
 
      <!-- Hora de inicio -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Hora de inicio</label>
        <div class="flex max-h-64 gap-2">
          <select
            v-model="horaInicio.hora" size="1"
            class="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 option:h-max-64"
          >
            <option disabled value="">HH</option>
            <option
              v-for="h in 24"
              :key="h"
              :value="String(h - 1).padStart(2, '0')"
            >
              {{ String(h - 1).padStart(2, '0') }}
            </option>
          </select>
          <select v-model="horaInicio.minuto"
            class="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
            <option disabled value="">MM</option>
            <option v-for="m in 12" :key="m" :value="String((m - 1) * 5).padStart(2, '0')">
              {{ String((m - 1) * 5).padStart(2, '0') }}
            </option>
          </select>
        </div>
      </div>
 
      <!-- Hora final -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Hora final</label>
        <div class="flex gap-2">
          <select v-model="horaFinal.hora"
            class="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
            <optgroup class="relative max-h-64">
              <option disabled value="">HH</option>
              <option v-for="h in 24" :key="h" :value="String(h - 1).padStart(2, '0')">{{ String(h - 1).padStart(2, '0')
                }}</option>
            </optgroup>
          </select>
          <select v-model="horaFinal.minuto"
            class="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
            <option disabled value="">MM</option>
            <option v-for="m in 12" :key="m" :value="String((m - 1) * 5).padStart(2, '0')">
              {{ String((m - 1) * 5).padStart(2, '0') }}
            </option>
          </select>
        </div>
      </div>
 
      <!-- Película -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Película</label>
        <select v-model="functionData.pelicula_id"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecciona una película</option>
          <option v-for="(pelicula) in peliculas" :key="pelicula.id" :value="pelicula.id">
            {{ pelicula.nombre }}
          </option>
        </select>
      </div>
 
      <!-- Sala -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Sala</label>
        <select v-model="functionData.sala_id"
          class="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="">Selecciona una sala</option>
          <option v-for="(sala) in salas" :key="sala.id" :value="sala.id">
            {{ sala.nombre }}
          </option>
        </select>
      </div>
    </form>
  </Dialog>
</template>
<script setup>
import Dialog from '../Dialog.vue'
 
const emit = defineEmits(['aceptar', 'cancelar'])
 
const isOpen = defineModel('open', {
  type: Boolean,
  required: true,
  default: false
})
 
const functionData = defineModel('functionData', {
  type: Object,
  required: true,
  default: () => ({
    fecha: '',
    hora_inicio: '',
    hora_final: '',
    sala_id: null,
    pelicula_id: null
  })
})
 
defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  peliculas: {
    type: Object,
    required: true,
    default: () => ({})
  },
  salas: {
    type: Object,
    required: true,
    default: () => ({})
  },
})
 
const horaInicio = reactive({ hora: '', minuto: '' })
const horaFinal = reactive({ hora: '', minuto: '' })
 
// Formatea fecha Date() o ISO a yyyy-mm-dd
function formatearFecha(fechaRaw) {
  const fecha = new Date(fechaRaw)
  const yyyy = fecha.getFullYear()
  const mm = String(fecha.getMonth() + 1).padStart(2, '0')
  const dd = String(fecha.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
 
// Rellenar datos si estamos editando
watch(isOpen, (val) => {
  if (val) {
    if (functionData.value.fecha) {
      functionData.value.fecha = formatearFecha(functionData.value.fecha)
    }
 
    if (functionData.value.hora_inicio) {
      const [h, m] = functionData.value.hora_inicio.split(':')
      horaInicio.hora = h
      horaInicio.minuto = m
    }
 
    if (functionData.value.hora_final) {
      const [h, m] = functionData.value.hora_final.split(':')
      horaFinal.hora = h
      horaFinal.minuto = m
    }
  }
})
 
watch([() => horaInicio.hora, () => horaInicio.minuto], () => {
  if (horaInicio.hora && horaInicio.minuto) {
    functionData.value.hora_inicio = `${horaInicio.hora}:${horaInicio.minuto}`
  }
})
 
watch([() => horaFinal.hora, () => horaFinal.minuto], () => {
  if (horaFinal.hora && horaFinal.minuto) {
    functionData.value.hora_final = `${horaFinal.hora}:${horaFinal.minuto}`
  }
})
 
// Reset
function resetForm() {
  horaInicio.hora = ''
  horaInicio.minuto = ''
  horaFinal.hora = ''
  horaFinal.minuto = ''
}
 
// Emit con reset
function onAceptar() {
  emit('aceptar')
  resetForm()
}
 
function onCancelar() {
  emit('cancelar')
  resetForm()
}
</script>