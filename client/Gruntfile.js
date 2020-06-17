module.exports = function(grunt) {

    grunt.initConfig({
       copy: {
          src: {
            expand: true,
            cwd: 'src',
            src: '**',
            dest: 'dist'
          }
      },
 
      clean: {
           dist: {
               src: 'dist'
           }
      },

      cssmin: {
        minify: {
            expand: true,
            cwd: 'dist/components/css',
            src: ['*.css', '**/*.css'],
            dest: 'dist/components/css'
        }
    },

      imagemin: {
       src: {
         expand: true,
         cwd: 'dist/components/img',
         src: '**/*.{png,jpg,gif}',
         dest: 'dist/components/img'
       }
     }, 

     watch: {
       js: {
         options: {
           event: ['changed']
         },
         files: 'src/**/*.js', 
         tasks: 'jshint:js'
       }
     }, 
 
     jshint: {
       js: {
         src: ['src/pages/**/*.js'],
         options: {
          undef: true,
          mocha: true,
          node: true,
          jshintrc: true,
          esversion: 6,
          globals: {
            require: true,
            module: true,
            console: true,
            esversion: 6,
          }
        }
       }
     }, 
 
     browserSync: {
       src: {
         bsFiles: {
           src : ['src/**/*']
         }, 
         options: {
             watchTask: true,
             server: {
                 baseDir: "src"
             }
         }
       }
     }
 
   });
 

 
   grunt.registerTask('dist', ['clean', 'copy']);
   grunt.registerTask('minifica', ['imagemin','cssmin']);
   grunt.registerTask('server', ["browserSync", "watch"]);
   grunt.registerTask('default', ['dist', 'minifica', ]);
 

   // Load Taks
   grunt.loadNpmTasks('grunt-contrib-copy'); 
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-imagemin'); 
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-browser-sync');
 };