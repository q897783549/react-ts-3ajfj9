const WebpackDevServer = require('webpack-dev-server/lib/Server');

export const devWebpack = () => {
  const spinner = ora('Webpack running dev ...');

  const rewriteConfig = loadFile(getCwdPath('./cli.config.json'));
  const webpackConfig = getDevConfig(rewriteConfig);

  const compiler = webpack(webpackConfig);

  const devServerOptions = {
    contentBase: 'dist',
    hot: true,
    historyApiFallback: true,
    compress: true,
    open: true,
  };

  const server = new WebpackDevServer(compiler, devServerOptions);

  server.listen(8000, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:8000');
  });
};
