<template>
  <div class="flex h-screen overflow-hidden">
    <NavSideBar v-if="user?.role === 'admin'" :username="user?.perfil.nombre" @logout="logout" class="flex-shrink-0" />
    <div class="flex flex-col flex-1 bg-gray-100">
      <AppHeader :is_user="user?.role !== 'admin'" class="flex-shrink-0" />
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
<script setup>
import AppHeader from '~/components/AppHeader.vue';
import NavSideBar from '~/components/NavSideBar.vue';

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { getUsersMe, logout} = authStore

await useAsyncData('user', () => getUsersMe())

</script>