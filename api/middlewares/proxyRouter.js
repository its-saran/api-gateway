import { createProxyMiddleware } from 'http-proxy-middleware';

const createProxyRouter = (target) => {
    const proxyRouter = createProxyMiddleware({
        target: target,
        changeOrigin: true,
        onProxyReq: (proxyReq, req, res) => {
            const log = req.log
            if (log) {
              const jsonData = JSON.stringify(log);
              proxyReq.setHeader('Content-Type', 'application/json');
              proxyReq.setHeader('Content-Length', Buffer.byteLength(jsonData));
              proxyReq.write(jsonData);
              proxyReq.end();
            }
        },
    });

  return proxyRouter;
};

export default createProxyRouter;


