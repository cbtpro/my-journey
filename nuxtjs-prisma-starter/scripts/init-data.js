import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

(async function () {
	try {
		// 初始化用户数据
		const users = await prisma.user.createMany({
			data: [
				{ name: 'Charlie', email: 'charlie@example.com' },
				{ name: 'Diana', email: 'diana@example.com' }
			]
		});

		console.log(`${users.count} users created.`);
	} catch (err) {
		console.error('Error seeding data:', err);
	} finally {
		await prisma.$disconnect();
	}
})();
