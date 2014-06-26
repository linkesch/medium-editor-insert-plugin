module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        options: {
          banner: '/*! \n * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n *\n * <%= pkg.homepage %>\n * \n * Copyright (c) 2014 <%= pkg.author.name %> (<%= pkg.author.url %>)\n * Released under the <%= pkg.license %> license\n */\n\n'
        },
        src: ['src/js/medium-editor-insert-plugin.js', 'src/js/medium-editor-insert-images.js', 'src/js/medium-editor-insert-maps.js', 'src/js/medium-editor-insert-embeds.js'],
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
      },
      f4: {
        options: {
          preserveComments: 'some'
        },
        src: 'src/js/medium-editor-insert-embeds.js',
        dest: 'dist/js/addons/medium-editor-insert-embeds.min.js'
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

    concat: {
      dist: {
        src: ['src/js/medium-editor-insert-plugin.js', 'src/js/medium-editor-insert-images.js', 'src/js/medium-editor-insert-maps.js', 'src/js/medium-editor-insert-embeds.js'],
        dest: 'dist/js/<%= pkg.name %>.all.js'
      }
    },

    jshint: {
      files: ['src/js/*.js', 'src/js/**/*.js', 'test/*.js', 'test/**/*.js'],
      options: {
        ignores: ['test/lib/**/*.js']
      }
    },

    qunit: {
      unit: 'test.html'
    },

    sass: {
      dist: {
        src: 'src/sass/*.scss',
        dest: 'dist/css/'
      }
    },

    autoprefixer: {
      dist: {
        src: 'dist/css/*.css'
      }
    },

    csso: {
      dist: {
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
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
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-csso');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('js', ['test', 'uglify', 'copy', 'concat']);
  grunt.registerTask('css', ['sass', 'autoprefixer', 'csso']);
  grunt.registerTask('default', ['js', 'css']);

};
