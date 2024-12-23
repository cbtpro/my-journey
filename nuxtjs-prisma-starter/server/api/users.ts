import prisma from '~/prisma';

export default defineEventHandler(async event => {
	try {
		const users = await prisma.user.findMany();
		const response: IResponseBody<IUser> = {
			data: users,
			message: 'success'
		};
		return response;
	} catch (error: any) {
		const response: IResponseBody<IUser> = {
			data: [],
			message: error.message
		};
		return response;
	} finally {
		await prisma.$disconnect();
	}
});
