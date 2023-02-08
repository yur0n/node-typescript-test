import Koa from 'koa';
import ping from 'ping';

export const latency: Koa.Middleware = async function (ctx, next) {
    const currentPing = await ping.promise.probe('google.com');
    ctx.body = { message: `Service server latency for google.com: ${currentPing.time}ms`}
};
