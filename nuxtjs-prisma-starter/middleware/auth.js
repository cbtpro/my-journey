export default defineNuxtRouteMiddleware((to, from) => {
	// 获取当前用户信息
	const user = useState('user'); // 获取用户信息（如果用 useState 保存）
	const authToken = useCookie('auth-token').value; // 假设 JWT 存储在 Cookie 中
	console.log(user.value);

	// 如果用户未登录且访问的是需要登录的页面，重定向到登录页面
	if (!user.value && !authToken) {
		// 未登录时，重定向到登录页面
		return navigateTo('/login');
	}
});
