import { createProxyMiddleware } from 'http-proxy-middleware';

const proxyRouter = createProxyMiddleware({
  target: 'https://asia-south1-career-mapr.cloudfunctions.net/naukri',
  changeOrigin: true
});

export default proxyRouter;
