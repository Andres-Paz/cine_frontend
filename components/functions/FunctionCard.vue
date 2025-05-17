<template>
    <div class="max-w-sm bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4">
      <h2 class="text-xl font-bold text-gray-800">Función de Película</h2>
  
      <div class="text-gray-600">
        <p><strong>Fecha:</strong> {{ fechaFormateada }}</p>
        <p><strong>Tipo:</strong> {{ funcion.sala_tipo }}</p>
        <p><strong>Hora:</strong> {{ funcion.hora_inicio }}</p>
        <p><strong>Sala:</strong> {{ funcion.sala_nombre }}</p>
        <p><strong>Asientos disponibles:</strong> {{ funcion.cupo_disponible }}</p>
      </div>
  
      <button
        class="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
        @click="comprar"
      >
        Comprar tickets
      </button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    funcion: {
      type: Object,
      required: true,
      default: () => ({
        fecha: '',
        hora: '',
        sala: ''
      })
    }
  })

  const fechaFormateada = computed(() => {
  const fecha = new Date(props.funcion.fecha);
  const opciones = { day: 'numeric', month: 'long' };
  return fecha.toLocaleDateString('es-ES', opciones); // Ej: "17 de mayo"
});

  
  const comprar = () => {
    alert('¡Ticket comprado!');
  }
  </script>
  
  <style scoped>
  /* Opcional: puedes agregar estilos personalizados aquí */
  </style>
  