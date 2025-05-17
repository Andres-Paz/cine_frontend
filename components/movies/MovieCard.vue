<template>
    <NuxtLink class="bg-white p-4 m-2 rounded shadow-md w-full max-w-sm" :to="`/peliculas/${movie.id}`">
      <h3 class="text-xl font-bold">{{ movie.nombre }}</h3>
      <p class="text-gray-700">{{ movie.clasificacion }}</p>
      <img :src="movie.imagen" alt="Movie Image" class="w-full h-auto mt-2 rounded" />
    </NuxtLink>
  </template>
  
  <script setup>
  defineProps({
    movie: {
      type: Object,
      required: true,
    }
  })
  </script>
  