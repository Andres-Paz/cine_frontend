<template>
    <div>
      <table class="min-w-full table-auto bg-white rounded shadow border border-gray-200">
        <thead class="bg-blue-100">
          <tr>
            <th class="px-4 py-2 text-left border-b">ID</th>
            <th class="px-4 py-2 text-left border-b">Nombre</th>
            <th class="px-4 py-2 text-left border-b">Apellido</th>
            <th class="px-4 py-2 text-left border-b">Usuario</th>
            <th class="px-4 py-2 text-left border-b">Rol</th>
            <th class="px-4 py-2 text-left border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="usuario in usuariosFiltrados" 
            :key="usuario.id" 
            class="hover:bg-gray-100"
          >
            <td class="px-4 py-2 border-b">{{ usuario.id }}</td>
            <td class="px-4 py-2 border-b">{{ usuario.perfil.nombre }}</td>
            <td class="px-4 py-2 border-b">{{ usuario.perfil.apellido }}</td>
            <td class="px-4 py-2 border-b">{{ usuario.username }}</td>
            <td class="px-4 py-2 border-b">{{ usuario.role }}</td>
            <td class="px-4 py-2 border-b space-x-2">
              <button
                @click="editarUsuario(usuario)"
                class="text-blue-600 hover:text-blue-800"
                title="Editar"
              >
                <Pencil class="w-5 h-5" />
              </button>
              <button
                @click="eliminarUsuario(usuario.id)"
                class="text-red-600 hover:text-red-800"
                title="Eliminar"
              >
                <Trash2 class="w-5 h-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <div v-if="usuariosFiltrados.length === 0" class="mt-4 text-gray-500 text-center">
        No se encontraron usuarios.
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from 'vue'
  import { useUsuariosStore } from '@/stores/usuarios'
  import { Trash2, Pencil } from 'lucide-vue-next'
  
  const props = defineProps({
    filter: {
      type: String,
      default: ''
    }
  })
  
  const usuariosStore = useUsuariosStore()
  
  onMounted(() => {
    usuariosStore.getUsuarios()
  })
  
  const usuariosFiltrados = computed(() => {
    if (!props.filter) return usuariosStore.usuarios
    const filtro = props.filter.toLowerCase()
    return usuariosStore.usuarios.filter(usuario => {
      return (
        usuario.perfil.nombre.toLowerCase().includes(filtro) ||
        usuario.perfil.apellido.toLowerCase().includes(filtro) ||
        usuario.username.toLowerCase().includes(filtro) ||
        usuario.role.toLowerCase().includes(filtro)
      )
    })
  })
  
  function editarUsuario(usuario) {
    alert(`Editar usuario: ${usuario.perfil.nombre} ${usuario.perfil.apellido}`)
  }
  
  function eliminarUsuario(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      alert(`Usuario con ID ${id} eliminado (simulado)`)
    }
  }
  </script>
  