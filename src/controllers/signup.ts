import Koa from 'koa';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User';
import Session from '../models/Session';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';

export const signup: Koa.Middleware = async (ctx) => {
	const data: any = ctx.request.body;
	if (!data.id || !data.password) {
		ctx.status = 403;
		return ctx.body = { error: 'Provide ID and password' }
	}

	let id_type: string;
	if (isEmail(data.id)) {
		id_type = "email";
	} else if (isMobilePhone(data.id)) {
		id_type = "phone";
	} else {
		ctx.status = 403
		return ctx.body = { error: 'ID must be valid Email or Phone number' }
	} 
	try {
		let user = await User.findOne({ id: data.id })
		if (user) {
			ctx.status = 403
			return ctx.body = { error: 'This ID already exists' }
		}
		
		user = new User({
			id: data.id,
			password: data.password,
			id_type
		});
		await user.save();
		
		const token = uuidv4();
		await Session.create({ token, user });
		
		ctx.body = { token };
	} catch (e) {
        ctx.status = 500;
		ctx.body = { error: 'Database error' }
        console.log(e);
    }
};