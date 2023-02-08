import Koa from 'koa';

export const info: Koa.Middleware = async function (ctx, next) {
	ctx.body = {
		id: ctx.state.user.id,
		id_type: ctx.state.user.id_type
	}
};