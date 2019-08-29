// {
//     "presets": [
//         "@babel/env",
//         "@babel/react"
//     ]
// }

module.exports = {
  presets: [
    '@babel/react',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
};
