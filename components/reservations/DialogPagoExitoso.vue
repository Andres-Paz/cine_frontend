<template>
    <Dialog
        v-model:open="isOpen"
        titulo="Pago Exitoso"
        cancelar-text="Ver cartelera"
        aceptar-text="Ver mis tickets"
        @cancelar="navigateTo('/peliculas')"
        @aceptar="navigateTo('/mis-tickets')"
    >   
        <div class="flex flex-col items-center justify-center text-center gap-3 p-4 text-lg">
            <BadgeCheck class="text-green-500" size="100"/>
            <span>
                El pago ha sido registrado con exito! Gracias por preferirnos
            </span>
        </div>
    </Dialog>
</template>
<script setup>
import { BadgeCheck } from 'lucide-vue-next';
import Dialog from '../Dialog.vue';

const isOpen = defineModel('open', {
  type: Boolean,
  required: true,
  default: false
})

</script>