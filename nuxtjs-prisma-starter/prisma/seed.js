import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	const users = await prisma.user.createMany({
		data: [
			{ name: 'Alice', email: 'alice@example.com' },
			{ name: 'Bob', email: 'bob@example.com' }
		]
	});
	console.log(`Seeded ${users.length} users`);
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});