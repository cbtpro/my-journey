<template>
	<div class="home">
		<h1>首页</h1>
		<!-- <button @click="loadUsersHandle">加载用户列表</button> -->
		用户列表:
		<ul>
			<li
				v-for="user in users.data"
				:key="user.id"
			>
				{{ user.name }}
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useAsyncData, useFetch } from 'nuxt/app';
import { ref, onMounted, watch } from 'vue';
defineOptions({
	name: 'Home'
});

const { data: users } = await useAsyncData('users', () => $fetch('/api/users'));
</script>
