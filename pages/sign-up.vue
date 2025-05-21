<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        @submit.prevent="handleSubmit"
        class="bg-white p-8 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 class="text-2xl font-bold text-center">Crear cuenta</h1>
  
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            required
            class="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
  
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            required
            class="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
  
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            v-model="form.nombre"
            type="text"
            id="nombre"
            required
            class="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
  
        <div>
          <label for="apellido" class="block text-sm font-medium text-gray-700">Apellido</label>
          <input
            v-model="form.apellido"
            type="text"
            id="apellido"
            required
            class="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
  
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  
  const {postUsuarioPublico} = useUsuarioStore()
  
  const form = reactive({
    username: '',
    password: '',
    nombre: '',
    apellido: '',
  })
  
  async function handleSubmit() {
    try {
      await postUsuarioPublico(form)
      navigateTo('/login')
    } catch (error) {
      console.error('Error al crear la cuenta:', error)
    }
    finally {
      form.username = ''
      form.password = ''
      form.nombre = ''
      form.apellido = ''
    }
  }
  definePageMeta({
  layout: 'login'
})
  </script>
  