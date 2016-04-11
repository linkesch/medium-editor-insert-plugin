module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        usebanner: 'grunt-banner'
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! \n * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n *\n * <%= pkg.homepage %>\n * \n * Copyright (c) 2014 <%= pkg.author.name %> (<%= pkg.author.url %>)\n * Released under the <%= pkg.license %> license\n */\n\n',

        concat: {
            dist: {
                options: {
                    banner: '<%= banner %>'
                },
                src: ['src/wrappers/start.js', 'src/js/templates.js', 'src/js/core.js', 'src/js/*.js', 'src/wrappers/end.js'],
                dest: 'dist/js/<%= pkg.name %>.js'
            }
        },

        uglify: {
            dist: {
                options: {
                    banner: '<%= banner %>'
                },
                src: ['dist/js/<%= pkg.name %>.js'],
                dest: 'dist/js/<%= pkg.name %>.min.js'
            }
        },

        jscs: {
            src: [
                'src/js/*.js',
                'spec/**/*.js',
                '!src/js/templates.js'
            ],
            options: {
                config: '.jscsrc'
            }
        },

        jshint: {
            options: {
                jshintrc: true
            },
            files: ['src/js/*.js', '!src/js/templates.js', 'spec/*.js']
        },

        jasmine: {
            suite: {
                src: 'src/js/*.js',
                options: {
                    specs: ['spec/*.spec.js'],
                    helpers: 'spec/helpers/*.js',
                    vendor: [
                        'bower_components/jquery/dist/jquery.min.js',
                        'bower_components/medium-editor/dist/js/medium-editor.min.js',
                        'bower_components/handlebars/handlebars.runtime.min.js',
                        'bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget.js',
                        'bower_components/blueimp-file-upload/js/jquery.iframe-transport.js',
                        'bower_components/blueimp-file-upload/js/jquery.fileupload.js',
                        'bower_components/jquery-sortable/source/js/jquery-sortable-min.js'
                    ],
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'reports/jasmine/coverage.json',
                        report: [{
                            type: 'lcov',
                            options: {
                                dir: 'reports/jasmine/lcov'
                            }
                        }]
                    },
                    summary: true
                }
            }
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

    grunt.registerTask('test', ['jscs', 'jshint', 'jasmine']);
    grunt.registerTask('js', ['test', 'handlebars', 'concat', 'uglify']);
    grunt.registerTask('css', ['sass', 'autoprefixer', 'csso', 'usebanner']);
    grunt.registerTask('default', ['js', 'css']);
};
