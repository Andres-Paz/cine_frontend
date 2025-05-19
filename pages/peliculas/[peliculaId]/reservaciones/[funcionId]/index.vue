<template>
    <Stepper
      v-model:step="step"
      @cancel="cancel"
      @next-step="nextStep"
      @prev-step="prevStep"
      @save="finish"
    >
      <template #step1>
        <TicketCantidadForm
          v-model:cantidad="cantidadPersonas"
          :cupo-disponible="functionRef?.cupo_disponible"
          :precio="precio"
        />
      </template>
      <template #step2>
        <CineSalaView
          v-model:new = newTickets
          :filas="sala?.filas"
          :columnas="sala?.columnas"
          is_selectable
          :tickets-num="cantidadPersonas"
          :tickets="tickets"
        />
      </template>
      <template #step3>
        <PagoTicketForm
          v-model:card="cardData"
          v-model:errors="cardErrors"
          :cantidad-personas="cantidadPersonas"
          :precio="precio"
        />
      </template>
    </Stepper>
    <DialogPagoExitoso v-model:open="showDialogPagoExitoso"/>
  </template>
  <script setup>
  import Stepper from '~/components/Stepper.vue';
  import CineSalaView from '~/components/CineSalaView.vue';
  import TicketCantidadForm from '~/components/reservations/TicketCantidadForm.vue';
  import PagoTicketForm from '~/components/reservations/PagoTicketForm.vue';
  import DialogPagoExitoso from '~/components/reservations/DialogPagoExitoso.vue';
   
  const { user } = storeToRefs(useAuthStore())

  const ticketsStore = useTicketsStore()
  const { tickets } = storeToRefs(ticketsStore)
  const { getTickets } = ticketsStore

  const salaStore = useSalaStore()
  const { sala } = storeToRefs(salaStore)
  const { getSala } = salaStore

  const functionStore = useFunctionStore()
  const { getFunction } = functionStore
  const { functionRef } = storeToRefs(functionStore)

  const { postTicket } = useTicketStore()

  const route = useRoute()

  onMounted(async () => {
    await getFunction(route.params.funcionId)
    console.log('functionRef', functionRef.value)
    await getSala(functionRef.value.sala_id)
    await getTickets(route.params.funcionId)
  })
   
  const cantidadPersonas = ref(1)
  const step = ref(1)
   
  const showDialogPagoExitoso = ref(false)
  const newTickets = ref([])
  const precio = 50.00
   
  const initializeTicket = () => {
    return {
      fecha: new Date().toISOString(),
      precio: precio.toFixed(2),
      butaca: null,
      perfil_id: user?.value.perfil.id,
      funciones_id: route.params.funcionId
    }
  }
   
  const cardData = ref({
      number: '',
      name: '',
      expiry: '',
      cvv: ''
  })
   
  const cardErrors = ref({})
   
  const nextStep = () => {
    if (step.value < 3) {
      if (step.value === 1) {
        if (cantidadPersonas.value >= 1 && cantidadPersonas.value <= functionRef.value.cupo_disponible) {
          newTickets.value = []
          for (let i = 0; i < cantidadPersonas.value; i++) {
            newTickets.value.push(initializeTicket())
          }
          step.value++
        }
      }
        if (step.value === 2) {
        const allSeatsSelected = newTickets.value.every(ticket => ticket.butaca !== null)
        if (allSeatsSelected) {
          step.value++
        }
      }
    }
  }
   
  const prevStep = () => {
    if (step.value > 1) step.value--
  }
   
   
  const cancel = () => {
    if(route.params.peliculasId) navigateTo(`/peliculas/${route.params.peliculasId}`)
    navigateTo(`/peliculas`)
  }
   
  const finish = async () => {
  await pagar()
}
 
const pagar = async () => {
  // Validaciones básicas
  cardErrors.value.number = !/^\d{16}$|^\d{4}\d{4}\d{4}\d{4}$/.test(cardData.value.number.replace(/\s/g, ''))
  cardErrors.value.expiry = !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.value.expiry) || !fechaValida(cardData.value.expiry)
  cardErrors.value.cvv = !/^\d{3,4}$/.test(cardData.value.cvv)
 
  if (!cardErrors.value.number && !cardErrors.value.expiry && !cardErrors.value.cvv) {
    for (const ticketData of newTickets.value) {
      await postTicket(ticketData)
    }
    showDialogPagoExitoso.value = true
  }
}
 
   
  const fechaValida = (fecha) => {
    const [mes, año] = fecha.split('/').map(n => parseInt(n))
    const ahora = new Date()
    const añoActual = ahora.getFullYear() % 100
    const mesActual = ahora.getMonth() + 1
   
    return año > añoActual || (año === añoActual && mes >= mesActual)
  }
  </script>
   