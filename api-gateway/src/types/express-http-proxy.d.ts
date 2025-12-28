declare module 'express-http-proxy' {
  import type { RequestHandler } from 'express';

  interface ProxyOptions {
    proxyReqPathResolver?: (req: any) => string;
    proxyErrorHandler?: (err: any, res: any, next: any) => any;
    proxyReqOptDecorator?: (proxyReqOpts: any, srcReq: any) => any;
    userResDecorator?: (proxyRes: any, proxyResData: any, userReq: any, userRes: any) => any;
  }

  function proxy(host: string, options?: ProxyOptions): RequestHandler;
  export default proxy;
}
