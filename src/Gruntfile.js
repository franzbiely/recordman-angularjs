module.exports = function(grunt) {
    const sass = require('node-sass');
    
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // ==================================[ DEVELOPMENT ]===========================================
        watch: {
            script: {
                files: ['components/*/*.js', 'screens/*/*.js'],
                tasks: ['concat']
            },
            style: {
                files: ['components/*/*.scss', 'screens/*/*.scss', 'assets/main.scss'],
                tasks: ['sass']
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'components/searchBar/searchBar.js',
                    'screens/home/home.js',
                    'screens/contact/contact.js',
                ],
                dest: 'assets/scripts.js',
            },
        },
        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    'assets/style.css': 'assets/main.scss'
                }
            }
        },
        // ==================================[ BUILD ]===========================================
        copy: {
            main: {
                files: [{
                    expand: true,
                    flatten : true,
                    src: ['index.html'],
                    dest: '../build/'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '../build/style.min.css': ['assets/style.css'],
                    '../build/vendor.min.css': [
                        // please put the vendor css here
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '../build/scripts.min.js': [
                        'assets/scripts.js'
                    ],
                    '../build/vendor.min.js': [
                        'node_modules/angular/angular.js', 
                        'node_modules/angular-ui-router/release/angular-ui-router.js'
                        // please put the vendor js here
                    ]
                }
            }
        },
    });
    grunt.registerTask('default', [
        'concat','sass','watch'
    ]);

    grunt.registerTask('build', [
        'copy', 'cssmin', 'uglify'
    ]);
};