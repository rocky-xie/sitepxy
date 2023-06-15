const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (req, res) => {
  let target = "https://search.yahoo.co.jp/";
  // 代理目标地址
  // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
  //   if (
  //     req.url.startsWith("/api") ||
  //     req.url.startsWith("/auth") ||
  //     req.url.startsWith("/banner") ||
  //     req.url.startsWith("/CollegeTask")
  //   ) {
  //     target = "http://106.15.2.32:6969";
  //   }

  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/backend`
      // 例如 /backend/user/login 将被转发到 http://backend-api.com/user/login
      //   "^/backend/": "/",
    },
        selfHandleResponse: true,
    on: {
    proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      const response = responseBuffer.toString('utf8'); // convert buffer to string
      return response.replace('search.yahoo.co.jp', 'y.btmd.eu.org'); // manipulate response and return the result
    }),
    },
  })(req, res);
};
