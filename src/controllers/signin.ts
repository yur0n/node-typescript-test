import Koa from 'koa';
import User from '../models/User';
import Session from '../models/Session';
import { v4 as uuidv4 } from 'uuid';

export const signin: Koa.Middleware = async function (ctx, next) {
	const data: any = ctx.request.body;
	if (!data.id || !data.password) {
		ctx.status = 403;
		return ctx.body = { error: 'Provide ID and password' }
	}
	
	try {
		const user = await User.findOne({ id: data.id, password: data.password });
		if (!user) {
			ctx.status = 403;
			return ctx.body = { error: 'Wrong ID or password' }
		}

		const token = uuidv4();
		await Session.create({ token, user });
		ctx.body = { token }

	} catch (e) {
		ctx.status = 400;
		ctx.body = { error: 'Database error' }
		console.log(e);
	}
};