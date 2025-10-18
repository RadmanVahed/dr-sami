import { defineEventHandler, proxyRequest } from 'h3';

export default defineEventHandler(async (event) => {
  const url = 'https://api.doctoreto.com/api/web/patient/v1/doctors/GwLgoM';
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
