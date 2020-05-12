const webpackMerge = require('webpack-merge');
const debounce = require('lodash.debounce');
const throttle = require('lodash.throttle');
const loadSharedConfig = require('./configs/shared');

const loadModeConfig = env => require(`./configs/${env.mode}`)(env);

module.exports = env =>
  webpackMerge(loadSharedConfig(env), loadModeConfig(env));
