<template>
	<div>
		<h1>Login</h1>
		<form @submit.prevent="login">
			<div>
				<label for="email">Email</label>
				<input
					type="email"
					id="email"
					v-model="email"
					required
				/>
			</div>
			<div>
				<label for="password">Password</label>
				<input
					type="password"
					id="password"
					v-model="password"
					required
				/>
			</div>
			<button type="submit">Login</button>
		</form>
		<div
			v-if="errorMessage"
			class="error"
		>
			{{ errorMessage }}
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();

const login = async () => {
	try {
		const response = await $fetch('/api/login', {
			method: 'POST',
			body: { email: email.value, password: password.value }
		});

		if (response.statusCode === 200) {
			const { user, token } = response;
			// 将 JWT token 保存在 cookie 中（有效期 1小时）
			useCookie('auth-token', { expires: new Date(Date.now() + 3600 * 1000) }).value = token;

			// 将用户信息保存在 useState 中
			useState('user', () => user);
			localStorage.setItem('token', response.token);
			// 登录成功，可以跳转到主页面或保存用户信息到状态管理
			console.log('Login successful:', response.user);
			router.push('/my-profile'); // 跳转到仪表板或首页
		} else {
			errorMessage.value = response.message;
		}
	} catch (error) {
		errorMessage.value = 'An error occurred, please try again.';
	}
};
</script>
