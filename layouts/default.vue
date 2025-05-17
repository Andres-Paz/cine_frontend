<template>
    <div >
        <div class="flex flex-row">
            <NavSideBar :username="user?.perfil.name" v-if="user?.role==='admin'" />
            <div class="flex flex-col w-full">
                <AppHeader />
                <slot />
            </div>
        </div>
    </div>
</template>
<script setup>
import AppHeader from '~/components/AppHeader.vue';
import NavSideBar from '~/components/NavSideBar.vue';

import { useAuthStore } from '@/store/auth'
const { user } = storeToRefs(useAuthStore())
</script>