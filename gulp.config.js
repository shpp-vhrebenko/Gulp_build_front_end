(function () {
    'use strict';   

    module.exports = {        
            baseDir: "./src",
            distBaseDir: "./dist",
            src: { //Пути откуда брать исходники
                php: 'src/.php',
                html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
                pug: 'src/pug_src/pages/*.pug',
                js: 'src/scripts/*.js',//В стилях и скриптах нам понадобятся только main файлы        
                style: 'src/styles/main.css',                
                style_media: 'src/styles/main_media.css',
                img: 'images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
                img_sprite: 'src/images/sprite/*.png',
                fonts: 'src/styles/fonts/**/*.{eot,svg,ttf,woff,woff2,css}',
                less_src: 'src/styles/main.less',
                sass: 'src/styles/main.scss',
                media_less_src: 'src/styles/main_media.less',
                bower_libs: 'src/bower/**/*.*'
            },           
            watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
                php: 'src/*.php',  
                html: 'src/*.html',               
                js: 'scripts/**/*.js',        
                css: 'styles/**/*.css',
                sass: 'styles/**/*.sass',
                style_less: 'styles/pages/*.less',
                style_main_less: 'styles/main.less',
                style_media_less: 'styles/pages_media/*.less',
                style_main_media_less: 'styles/main_media.less',
                sprite_less: 'styles/sprite/',
                img: 'img/**/*.*',
                fonts: 'styles/fonts/**/*.*'
            },
            build: { //Тут мы укажем куда складывать готовые после сборки файлы
                html: 'dist/',
                pug: 'dist/pug/',
                php: 'dist/',
                js: 'dist/scripts/',
                css: 'dist/styles/',
                less: 'dist/styles/',
                media_css: 'dist/styles/media_styles/',
                img: 'dist/images/',
                fonts: 'dist/styles/fonts/',
                less: 'dist/styles/',
                bower_libs: 'dist/bower/'                
            },
            clean: 'dist/',
    }   

})();
