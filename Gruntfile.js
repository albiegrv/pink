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
            "index.html",
            "form.html",
            "blog.html",
            "post.html"
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

    concat: {
        options: {
          separator: ';',
        },
        index: {
          src: ['bower_components/tap/dist/tap.min.js', 'src/js/burger.js', 'src/js/revslider.js'],
          dest: 'build/js/index.js',
        },
        form: {
          src: ['bower_components/tap/dist/tap.min.js', 'bower_components/mustache.js/mustache.min.js', 'bower_components/moment/min/moment.min.js', 'src/js/burger.js', 'src/js/range.js', 'src/js/changedate.js', 'src/js/addtraveller.js', 'src/js/senddata.js'],
          dest: 'build/js/form.js',
        },
        basic: {
          src: ['bower_components/tap/dist/tap.min.js', 'src/js/burger.js'],
          dest: 'build/js/script.js',
        },
      },

    minified: {
      files: {
        src: [
        'build/js/*.js'
        ],
        dest: 'build/js/'
      },
      options: {
        sourcemap: false,
        allinone: false,
        ext: '.min.js'
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

    csscomb: {
      style: {
        expand: true,
        src: ["src/sass/**/*.scss"]
      }
    },

    watch: {
      style: {
        // files: ['src/sass/**/*.scss'],
        // tasks: ['sass', 'cmq', 'postcss', 'cssmin'],
        files: ['src/js/*.js'],
        tasks: ['concat', 'minified'],
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
    "concat",
    "minified",
    "imagemin",
    ]);

  config = require('./.gosha')(grunt, config);

  grunt.initConfig(config);
};
