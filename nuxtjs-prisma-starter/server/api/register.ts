import prisma from '~/prisma';
import bcrypt from 'bcrypt';

export default defineEventHandler(async event => {
	const body = await readBody(event);

	const { name, email, password } = body;

	if (!name || !email || !password) {
		throw createError({ statusCode: 400, message: 'All fields are required' });
	}

	// 检查是否已存在该用户
	const existingUser = await prisma.user.findUnique({
		where: { email }
	});

	if (existingUser) {
		throw createError({ statusCode: 400, message: 'Email is already registered' });
	}

	// 哈希密码并保存用户
	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword
		}
	});

	return { message: 'User registered successfully', user: { id: user.id, name: user.name, email: user.email } };
});
