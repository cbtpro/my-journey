import prisma from '~/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async event => {
	const body = await readBody(event);

	const { email, password } = body;

	if (!email || !password) {
		throw createError({ statusCode: 400, message: 'Email and password are required' });
	}

	// 查找用户
	const user = await prisma.user.findUnique({
		where: { email }
	});

	if (!user) {
		throw createError({ statusCode: 400, message: 'Invalid email or password' });
	}

	// 验证密码
	const isValidPassword = await bcrypt.compare(password, user.password);

	if (!isValidPassword) {
		throw createError({ statusCode: 400, message: 'Invalid email or password' });
	}

	// 生成 JWT
	const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

	const userInfo = { id: user.id, name: user.name, email: user.email };

	return {
		statusCode: 200,
		message: 'Login successful',
		token,
		user: userInfo
	};
});
