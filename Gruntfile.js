module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! \n * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n *\n * <%= pkg.homepage %>\n * \n * Copyright (c) 2014 <%= pkg.author.name %> (<%= pkg.author.url %>)\n * Released under the <%= pkg.license %> license\n */\n\n',

    uglify: {
      build: {
        options: {
          banner: '<%= banner %>'
        },
        src: ['src/js/medium-editor-insert-plugin.js', 'src/js/medium-editor-insert-images.js', 'src/js/medium-editor-insert-maps.js', 'src/js/medium-editor-insert-embeds.js', 'src/js/medium-editor-insert-tables.js'],
        dest: 'dist/js/<%= pkg.name %>.all.min.js'
      },
      build2: {
        options: {
          banner: '<%= banner %>'
        },
        files: [{
          expand: true,
          cwd: 'src/js',
          src: '**/*.js',
          dest: 'dist/js/addons',
          ext: '.min.js'
        }]
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
        files: [{
          expand: true,
          cwd: 'src/sass/',
          src: ['*.scss'],
          dest: 'dist/css/',
          ext: '.css'
        }]
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
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-csso');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('js', ['test', 'uglify']);
  grunt.registerTask('css', ['sass', 'autoprefixer', 'csso']);
  grunt.registerTask('default', ['js', 'css']);

};
