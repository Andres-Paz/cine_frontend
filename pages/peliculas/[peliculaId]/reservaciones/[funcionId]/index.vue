<template>
    <Stepper>
        <template #step1>
            Seleccionar asientos
        </template>
        <template #step2>
            <CineSalaView
                :filas="sala.filas"
                :columnas="sala.columnas"
                is_selectable
                :tickets-num="ticketsPorComprar"
            />
        </template>
        <template #step3>
            <Step3 />
        </template>
    </Stepper>
</template>

<script setup>
const salaStore = useSalaStore()
const { getSala } = salaStore
const { sala } = storeToRefs(salaStore)

const ticketsStore = useTicketsStore()
const { getTickets } = ticketsStore
const { tickets } = storeToRefs(ticketsStore)

const funcionStore = useFunctionStore()
const { getFunction } = funcionStore
const { functionRef } = storeToRefs(funcionStore)

const route = useRoute()

await useAsyncData('sala', () => getFunction(route.params.funcionId))

onMounted(async () => {

    await getSala(functionRef.value.sala_id)
    await getTickets(route.params.funcionId)
})

const ticketsPorComprar = ref(0)
</script>
