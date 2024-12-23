interface IUser {
	/** 用户 id 自增 */
	id: number;
	/** 用户名 */
	name: string;
	/** 邮箱 */
	email: string;
	/** 密码 */
	password: string;
	/** 创建时间 */
	createdAt: Date;
}

/**
 * 返回数据
 */
interface IResponseBody<T> {
	data: T[];
	message?: string;
}
