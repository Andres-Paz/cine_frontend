<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="submit" class="bg-white p-6 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4">Iniciar Sesión</h2>

      <input v-model="username" type="text" placeholder="Username"
             class="w-full p-2 border mb-4 rounded" required />
      <input v-model="password" type="password" placeholder="Contraseña"
             class="w-full p-2 border mb-4 rounded" required />

      <button type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Entrar
      </button>

      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </form>
  </div>
</template>
<script setup>

const username = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()

const { login } = auth
 
const submit = async () => {
	error.value = ""
	try {
		await login({
    username: username.value,
    password: password.value
  })
	} catch (err) {
		error.value = 'Username o Contrasena invalidos'
	}
}
definePageMeta({
  layout: 'login'
})
</script>
