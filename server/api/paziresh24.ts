import { defineEventHandler, proxyRequest } from 'h3';

export default defineEventHandler(async (event) => {
  const url = 'https://apigw.paziresh24.com/open-platform/v1/jahannama/search?text=%D8%B1%D8%A7%D9%85%DB%8C%D9%86%20%D8%B3%D8%A7%D9%85%DB%8C';
  try {
    const res = await proxyRequest(event, url);
    console.log('proxy success'); // ساده برای اطمینان
    return res;
  } catch (err:any) {
    console.error('proxy error', err);
    event.node.res.statusCode = err?.status || 500;
    return { error: true, message: err?.message || 'unknown' };
  }
});
