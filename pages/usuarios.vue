<template>
  <div class="h-full bg-gray-100">
    <!-- Componente de acciones -->
    <AppActions 
      v-model:search="search"
      :is_admin="user?.role === 'admin'" 
      item="usuario" 
    />

    <!-- Contenido principal -->
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-4">Lista de usuarios</h2>
      <UsuarioTable :filter="search" />
    </div>
  </div>
</template>

<script setup>
// Importaciones
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import AppActions from '~/components/AppActions.vue'
import UsuarioTable from '~/components/users/UsuarioTable.vue' // <- Ruta corregida
import { useAuthStore } from '~/stores/auth'

const { user } = storeToRefs(useAuthStore())
const search = ref('')
</script>
