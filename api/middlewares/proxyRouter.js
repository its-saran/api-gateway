import { createProxyMiddleware } from 'http-proxy-middleware';

const createProxyRouter = (target) => {
    const proxyRouter = createProxyMiddleware({
        target: target,
        changeOrigin: true,
        pathRewrite: (path, req) => {
            const apiRoute = req.log.gatewayReq.apiRoute
            const service = req.log.gatewayReq.service
            const newPath = path.replace(`/${apiRoute}/${service}`, `/${apiRoute}`).replace(/&?apikey=[^&]*/g, '');
            // const newPath = path.replace(`/${apiRoute}/${service}`, `/${service}/${apiRoute}`).replace(/&?apikey=[^&]*/g, '');
            return newPath;
        },
        onProxyReq: (proxyReq, req, res) => {
            const log = {
                path: req.log.path,
                id: req.log.id,
            }
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



