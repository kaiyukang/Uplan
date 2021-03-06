/**
 * Created by dylanwang on 16/9/24.
 */

module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'routes/**/js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
            ,
            uglify: {
                files: ['public/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }, styles: {
                files: ['public/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['public/libs/**/*.js']
            },
            all: ['public/js/*.js', 'test/**/*.js', 'app/**/*.js']
        },

        nodemon:{
            dev:{
                options:{
                    file: 'app.js',
                    args:[],
                    ignoredFiles:['README.md','node_models/**','.DS_Store'],
                    watchedExtentions: ['js'],
                    watchedFolders:['./'],
                    debug:true,
                    delayTime:1,
                    env:{
                        PORT:3000
                    },
                    cwd:__dirname
                }
            }
        },
        concurrent:{
            tasks: ['nodemon','watch'],
            options:{
                logConcurrentOutput: true
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.option('force', true);
    grunt.registerTask('default',['concurrent'])

};
