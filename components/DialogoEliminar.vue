<template>
    <Dialog 
      v-model:open="isOpen"
      :titulo="`Eliminar ${item}`"
      @aceptar="$emit('aceptar')"
      @cancelar="$emit('cancelar')"
      :aceptar-text="`Eliminar`"
    >
        <div class="text-center max-w-sm">
            <p class="text-gray-700">¿Estás seguro de que deseas eliminar <strong>{{ item }}</strong>?</p>
            <p class="text-gray-500">Esta acción no se puede deshacer.</p>
        </div>
    </Dialog>
</template>
<script setup>
import Dialog from './Dialog.vue';
defineEmits(['aceptar', 'cancelar']);
defineProps({
    item: {
        type: String,
        required: true,
        default: 'pelicula'
    }
})
const isOpen = defineModel('open', {
    type: Boolean,
    required: true,
    default: false
})
</script>