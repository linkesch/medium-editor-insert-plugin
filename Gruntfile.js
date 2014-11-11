module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! \n * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n *\n * <%= pkg.homepage %>\n * \n * Copyright (c) 2014 <%= pkg.author.name %> (<%= pkg.author.url %>)\n * Released under the <%= pkg.license %> license\n */\n\n',

        uglify: {
            dist: {
                options: {
                    banner: '<%= banner %>'
                },
                src: ['src/js/templates.js', 'src/js/core.js', 'src/js/*.js'],
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },
        
        concat: {
            dist: {
                options: {
                    banner: '<%= banner %>'
                },
                src: ['src/js/templates.js', 'src/js/core.js', 'src/js/*.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            files: ['src/js/*.js', '!src/js/templates.js', 'test/*.js']
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
                options: {
                    banner: '<%= banner %>'
                },
                expand: true,
                cwd: 'dist/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css/',
                ext: '.min.css'
            }
        },

        usebanner: {
            dist: {
                options: {
                    banner: '<%= banner %>',
                    linebreak: false
                },
                files: [{
                    expand: true,
                    cwd: 'dist/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css/',
                    ext: '.css'
                }]
            }
        },

        watch: {
            styles: {
                files: 'src/sass/**/*.scss',
                tasks: ['css'],
                options: {
                    debounceDelay: 250
                }
            },
            templates: {
                files: 'src/js/templates/**/*.hbs',
                tasks: ['handlebars'],
                options: {
                    debounceDelay: 250
                }
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'MediumInsert.Templates'
                },
                files: {
                    'src/js/templates.js': 'src/js/templates/*.hbs'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('js', ['test', 'handlebars', 'uglify', 'concat']);
    grunt.registerTask('css', ['sass', 'autoprefixer', 'csso', 'usebanner']);
    grunt.registerTask('default', ['js', 'css']);

};
