'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "img/**",
            "js/**",
            "index.html",
            "form.html"
          ],
          dest: "build"
        }]
      }
    },

    clean: {
      build: ["build"]
    },

    sass: {
      style: {
        files: {
          "build/css/style.css": ["src/sass/style.scss"]
        }
      }
    },

    cmq: {
      style: {
        files: {
          "build/css/style.css" : ["build/css/style.css"]
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: "gzip"
      },
      style: {
        files: {
          "build/css/style.min.css" : ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png, jpg, gif, svg}"]
        }]
      }
    },

    watch: {
      style: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'postcss'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  };

  grunt.registerTask("build", [
    "clean",
    "copy",
    "sass",
    "cmq",
    "postcss",
    "cssmin",
    //"imagemin",
    ]);

  config = require('./.gosha')(grunt, config);

  grunt.initConfig(config);
};
