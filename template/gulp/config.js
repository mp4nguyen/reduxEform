'use strict';

module.exports = {

  'serverport': 6500,

  'styles': {
    'src' : 'source/assets/sass/**/*',
    'dest': 'public/css'
  },

  'scripts': {
    'src' : 'source/assets/js/**/*',
    'dest': 'public/js'
  },

  'fonts': {
      'src' : 'source/assets/fonts/**/*',
      'dest': 'public/fonts'
    },

  'images': {
    'src' : 'source/assets/images/**/**/**/*',
    'dest': 'public/images'
  },

  'json': {
    'src' : 'source/assets/json/**/**/**/*',
    'dest': 'public/json'
  },

  'views': {
    'watch': 'source/views/**/*.html',
    'src'  : 'source/views/*.html'
  },

  'dist': {
    'root'  : 'public'
  }

};
