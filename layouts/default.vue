<template>
    <div class="flex flex-row h-screen">
        <NavSideBar v-if="user.role === 'admin'" :username="user.perfil.name" @logout="logout"/>
        <div class="flex flex-col w-full">
            <AppHeader :is_user="user.role === 'admin' ? false : true"/>
            <div class="h-full overflow-y-auto"><slot /></div>
        </div>
    </div>
</template>
<script setup>
import AppHeader from '~/components/AppHeader.vue';
import NavSideBar from '~/components/NavSideBar.vue';

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { getUsersMe, logout } = authStore

await useAsyncData('user', () => getUsersMe())
</script>