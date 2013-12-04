module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      build: {
        options: {
          banner: '/*! \n * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n *\n * <%= pkg.homepage %>\n * \n * Copyright (c) 2013 <%= pkg.author.name %> (<%= pkg.author.url %>)\n * Released under the <%= pkg.license %> license\n */\n\n'
        },
        src: ['src/js/medium-editor-insert-plugin.js', 'src/js/medium-editor-insert-images.js', 'src/js/medium-editor-insert-maps.js'],
        dest: 'dist/js/<%= pkg.name %>.all.min.js'
      },
      f1: {
        options: {
          preserveComments: 'some'
        },
        src: 'src/js/medium-editor-insert-plugin.js',
        dest: 'dist/js/addons/medium-editor-insert-plugin.min.js'
      },
      f2: {
        options: {
          preserveComments: 'some'
        },
        src: 'src/js/medium-editor-insert-images.js',
        dest: 'dist/js/addons/medium-editor-insert-images.min.js'
      },
      f3: {
        options: {
          preserveComments: 'some'
        },
        src: 'src/js/medium-editor-insert-maps.js',
        dest: 'dist/js/addons/medium-editor-insert-maps.min.js'
      }
    },
    
    copy: {
      main: {
        files: [
          {
            expand: true, 
            cwd: 'src/js/',
            src: ['*'],
            dest: 'dist/js/addons/'
          }
        ]
      }
    },
    
    jshint: {
      files: ['src/js/*.js', 'src/js/**/*.js', 'test/*.js', 'test/**/*.js']
      /*options: {
        ignores: ['src/js/lib/modernizr-custom.js', 'src/js/templates/templates.js']
      }*/
    },
    
    qunit: {
      unit: 'test.html'
    },
    
    compass: {                 
      dist: {                   
        options: {              
          sassDir: 'src/sass',
          cssDir: 'dist/css',
          environment: 'production',
          outputStyle: 'compressed'
        }
      }
    },
    
    watch: {
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['js'],
        options: {
          debounceDelay: 250
        }
      },
      styles: {
        files: 'src/sass/**/*.scss',
        tasks: ['css'],
        options: {
          debounceDelay: 250
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('js', ['jshint', 'uglify', 'copy']);
  grunt.registerTask('css', ['compass']);
  grunt.registerTask('default', ['js', 'css']);
  
};