<template>
    <div class="bg-white p-4 rounded-xl shadow-md border border-gray-200 flex flex-col md:flex-col gap-4 items-stretch max-w-md w-full">
    <!-- Info del ticket -->
    <div class="flex-1 flex-row space-y-4">
      <h3 class="text-xl font-semibold text-gray-800">Ticket #{{ ticket.id }}</h3>
      <p class="text-gray-700 flex items-center gap-2"><Armchair /> <span class="font-medium">Butaca:</span> {{ ticket.butaca }}</p>
      <p class="text-gray-700 flex items-center gap-2"><Calendar1/><span class="font-medium">Fecha de compra:</span> {{ formatDate(ticket.fecha) }}</p>
      <p class="text-gray-700 flex items-center gap-2"><AlarmClockCheck/><span class="font-medium">Función:</span> {{ formatDate(ticket.funcion_fecha) }} a las {{ ticket.hora_inicio }}</p>
      <p class="text-gray-700 flex items-center gap-2"><Theater/><span class="font-medium">Sala:</span> {{ ticket.sala_nombre }}</p>
      <p class="text-gray-700 flex items-center gap-2"><Coins/><span class="font-medium">Precio:</span> Q{{ ticket.precio.toFixed(2) }}</p>
    </div>
    <!-- QR -->
     <div class="flex w-full items-center justify-center">
         <div class="relative w-32 h-32 border border-gray-300 rounded-md items-center justify-center">
             <div v-if="loader" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-md z-10">
                 <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
             </div>
             <canvas ref="qrCanvas" class="w-full h-full p-1" />
         </div>
     </div>
  </div>
</template>

<script setup>
import { Armchair, AlarmClockCheck, Calendar1, Popcorn, Theater, Coins } from 'lucide-vue-next'
import QRCode from 'qrcode'

const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const qrCanvas = ref(null)
const loader = ref(true)

const generateQRCode = async () => {
    loader.value = true
  if (!qrCanvas.value) return
  const data = {
    id: props.ticket.id,
    fecha_compra: props.ticket.fecha,
    butaca: props.ticket.butaca,
    funcion: {
      id: props.ticket.funcion_id,
      fecha: props.ticket.funcion_fecha,
      hora_inicio: props.ticket.hora_inicio
    },
    sala: props.ticket.sala_nombre,
    precio: props.ticket.precio
  }

  await QRCode.toCanvas(qrCanvas.value, JSON.stringify(data), {
    width: 128,
    margin: 2
  })
  loader.value = false
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

onMounted(generateQRCode)
watch(() => props.ticket, generateQRCode, { deep: true })
</script>
