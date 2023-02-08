import Koa from 'koa';
import Session from '../models/Session';

export const logout: Koa.Middleware = async (ctx) => {
	try {
		const token = ctx.request.get('Authorization');
		if (!token) {
			ctx.status = 403;
			return ctx.body = { error: 'Access denied' }
		}

		const session = await Session.findOne({ token }).populate('user');
		if (!session) {
			ctx.status = 403;
			return ctx.body = { error: 'Access denied' }
		}

		if (ctx.query.all === 'true') {
			await Session.deleteMany({ user: session.user._id });
			return ctx.body = { message: 'Logged out all sessions' }
		} else if (ctx.query.all === 'false') {
			await Session.deleteOne({ token });
			return ctx.body = { message: 'Logged out' }
		} else {
			ctx.status = 400;
			return ctx.body = { error: 'Wrong param' }
		}
	} catch (e) {
		ctx.status = 500;
		ctx.body = { error: 'Database error' }
		console.log(e);
	}
}