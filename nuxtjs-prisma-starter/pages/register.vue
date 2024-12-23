<template>
	<form @submit.prevent="register">
		<input
			v-model="name"
			placeholder="Name"
			required
		/>
		<input
			v-model="email"
			placeholder="Email"
			type="email"
			required
		/>
		<input
			v-model="password"
			placeholder="Password"
			type="password"
			required
		/>
		<button type="submit">Register</button>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

async function register() {
	try {
		const response = await $fetch('/api/register', {
			method: 'POST',
			body: { name: name.value, email: email.value, password: password.value }
		});
		console.log('User registered:', response);
		router.push('/login');
	} catch (err) {
		console.error('Error:', err);
	}
}
</script>
