const path = require('path');
const SRC_PATH = path.join(__dirname, '../src');

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.stories\.[tj]sx?$/,
      use: [
        {
          loader: require.resolve('@storybook/source-loader'),
          options: { injectParameters: true },
        },
      ],
      include: [path.resolve(__dirname, '../src')],
      enforce: 'pre',
    },
    {
      test: /\.(ts|tsx)$/,
      include: [SRC_PATH],
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
          },
        },
        { loader: require.resolve('react-docgen-typescript-loader') },
      ],
    }
  );
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
