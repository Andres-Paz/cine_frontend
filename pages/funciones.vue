<template>
    <div class="h-full bg-gray-100">
        <AppActions 
          v-model:search="search"
          :is_admin="user?.role === 'admin' ? true : false"
          item="funciones" 
        />
      <div class="flex flex-wrap justify-center p-4">
        Funciones
      </div>
    </div>
</template>
<script setup>
import AppActions from '~/components/AppActions.vue';
const { user } = storeToRefs(useAuthStore())

const search = ref('')
</script>