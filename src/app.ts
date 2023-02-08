import * as dotenv from 'dotenv';
dotenv.config();
import Koa from "koa";
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import views from 'koa-views'
import serve from 'koa-static'
import { signin } from './controllers/signin';
import { signup } from './controllers/signup';
import { logout } from './controllers/logout';
import { info } from './controllers/info';
import { latency } from './controllers/latency';
import { contsession } from './controllers/contsession';

const app = new Koa();

app.use(bodyparser());
app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', '*');
	ctx.set('Access-Control-Allow-Methods', 'POST, GET');
	await next();
});
app.use(serve('./public'));
app.use(views('./views', {
	extension: 'hbs',
	map: { hbs: 'handlebars' },
	options: {
		partials: {
			header: './partials/header',
			footer: './partials/footer',
		},
	}
}))

const router = new Router<Koa.DefaultState, Koa.Context>();

router.post('/api/signin', signin);
router.post('/api/signup', signup);
router.get('/api/logout', logout);
router.get('/api/info', contsession, info);
router.get('/api/latency', contsession, latency);

router.get('/', async ctx => {
	await ctx.render('index', {title: 'Sign in'});
});
router.get('/signup', async ctx => {
	await ctx.render('signup', {title: 'Sign up'});
});
router.get('/app', async ctx => {
	await ctx.render('app', {title: 'App'});
});
router.get('/info', async ctx => {
	await ctx.render('info', {title: 'Info'});
});
router.get('/latency', async ctx => {
	await ctx.render('latency', {title: 'Latency'});
});
router.all('(.*)', async ctx => {
	ctx.status = 404;
	await ctx.render('404', { title: '404' });
});

app.use(router.routes());

export default app;