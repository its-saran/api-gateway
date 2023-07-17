import { createProxyMiddleware } from 'http-proxy-middleware';

const createProxyRouter = (target) => {
  const proxyRouter = createProxyMiddleware({
    target: target,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      const apiType = req.logData.gatewayRequest.apiType
      const service = req.logData.gatewayRequest.service
      const newPath = path.replace(`/${apiType}/${service}`, `/${service}/${apiType}`).replace(/&?apikey=[^&]*/g, '');
      return newPath;
    }
  });

  return proxyRouter;
};

export default createProxyRouter;