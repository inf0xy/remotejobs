const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano')({
  preset: 'default'
});

module.exports = {
  plugins: [
    'postcss-preset-env',
    tailwindcss,
    autoprefixer,
    cssnano
  ],
};
