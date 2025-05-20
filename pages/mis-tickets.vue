<template>
    <div class="flex flex-wrap gap-8">
        <MiTicketCard
            v-for="ticket in tickets" 
            :ticket="ticket"
        />
    </div>
</template>
<script setup>
import MiTicketCard from '~/components/reservations/MiTicketCard.vue';

const ticketsStore = useTicketsStore()
const {getTickets} = ticketsStore
const { tickets } = storeToRefs(ticketsStore)

const { user } = storeToRefs(useAuthStore())

await useAsyncData('ticketsStore', async () => {
    await getTickets(null, user.value.perfil.id)
})



</script>