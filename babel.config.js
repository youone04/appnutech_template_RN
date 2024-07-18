module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@helper': './src/helper',
          '@configRedux': './src/configRedux',
        },
      },
    ],
  ],
};

