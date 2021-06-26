const path = require("path"); //引入path模块（node）
const resolve = (dir) => path.join(__dirname, dir); //将文件组成绝对路径

module.exports = {
  devServer: {
    compress: true,
    // disableHostCheck: true, //webpack4.0 开启热更新
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true,
    },
    port: 1314,
    proxy: "http://localhost:3000",
    hot: true,
  },
  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"));
    config.optimization.minimizer("terser").tap((args) => {
      // 去除生产环境console
      args[0].terserOptions.compress.drop_console = true;
      return args;
    });
  },
};
