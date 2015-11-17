var Merge = require('broccoli-merge-trees');
var Sass = require('broccoli-sass');
var Funnel = require('broccoli-funnel');
var Babel = require('broccoli-babel-transpiler');
var Concat = require('broccoli-concat');

var jquery = new Funnel('bower_components/jquery/dist', {
  files: ['jquery.js'],
});
var stylePaths = [
    'sass',
    'bower_components/normalize-css',
    'bower_components/font-awesome/scss',
    'bower_components/bourbon/app/assets/stylesheets',
    'bower_components/neat/app/assets/stylesheets',
  ];

var scripts = Babel('src', {
      browserPolyfill: true,
      stage: 0,
      moduleIds: true,
      modules: 'amd',
});

scripts = Concat(scripts, {
      inputFiles: [
        '**/*.js',
      ],
      outputFile: '/app.js',
    });

var styles = new Sass(stylePaths, 'app.scss', 'app.css');

module.exports = new Merge(['public', styles, jquery, scripts, 'bower_components/font-awesome/fonts'], { overwrite: true });
