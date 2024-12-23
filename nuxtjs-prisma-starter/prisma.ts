import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

prisma.$use(async (params, next) => {
	const start = Date.now();
	const result = await next(params);
	const duration = Date.now() - start;
	console.log(`${params.model}.${params.action} took ${duration}ms`);
	return result;
});

export default prisma;
