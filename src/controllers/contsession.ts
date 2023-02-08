import Koa from 'koa';
import Session from '../models/Session';

export const contsession: Koa.Middleware = async (ctx, next) => {
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
		session.lastVisit = new Date();
		await session.save();

		ctx.state.user = session.user;
		return next();
	} catch (e) {
		ctx.status = 500;
		ctx.body = { error: 'Database error' }
		console.log(e);
	}
}
