module.exports = function(grunt) {

  var app_js = [
    'app/app.module.js',
    'app/components/**/*.js'
  ];

  var app_css = [
    'assets/css/*.css'
  ];

  // Project configuration
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'assets/scss/',
          src: ['*.scss'],
          dest: 'assets/css/',
          ext: '.css'
        }]
      }
    },
    watch: {
      sass: {
        files: 'assets/scss/**/*.scss',
        tasks: ['sass']
      }/*,
      tests: {
        files: ['tests/!*.js', 'public/js/!*.js'],
        tasks: ['karma:unit_auto']
      }*/
    },
    /*karma: {
      unit: {
        configFile: './my.conf.js',
        singleRun: true
      },
      unit_auto: {
        configFile: './my.conf.js',
        autoWatch: true
      }
    },*/
    uglify: {
      options: {
        mangle: false
      },
      release_js: {
        files: {
          './build/app.min.js': app_js
        }
      }
    },
    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      target: {
        files: {
          './build/app.min.css': app_css
        }
      }
    },
    injector: {
      options: {
        addRootSlash: false
      },
      prod_js: {
        files: {
          './index.html': 'build/app.min.js'
        }
      },
      prod_css: {
        files: {
          './index.html': 'build/app.min.css'
        }
      },
      dev_js: {
        files: {
          './index.html': app_js
        }
      },
      dev_css: {
        files: {
          './index.html': app_css
        }
      }
    }
  });


  // Tasks
  //grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('build:release', ['uglify', 'cssmin', 'injector:prod_js', 'injector:prod_css']);
  grunt.registerTask('build:dev', ['injector:dev_js', 'injector:dev_css']);

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-injector');
  //grunt.loadNpmTasks('grunt-karma');
};