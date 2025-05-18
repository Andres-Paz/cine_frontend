<template>
    <div class="flex justify-between items-center p-4">
        <div class="relative w-64">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 focus:ring-blue-500" />
            <input
            v-model="search"
            type="text"
            :placeholder="`Buscar ${item}...`"
            class="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
        <button 
            v-if="is_admin" 
            class="bg-blue-200 flex gap-3 p-2.5 items-center text-center justify-center cursor-pointer hover:bg-blue-300 rounded-lg"
            @click="$emit('agregar')"
        >
            <Plus />
            Agregar {{ item }}
        </button>
    </div>
</template>
<script setup>
import { Search, Plus } from 'lucide-vue-next';

const search = defineModel('search', { type: String, default: '', required: true})

defineProps({
    item: {
        type: String,
        required: true, 
        default: ''
    },
    is_admin: {
        type: Boolean,
        required: true, 
        default: false
    }
})
defineEmits(['agregar'])
</script>