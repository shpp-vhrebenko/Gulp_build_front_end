var gulp = require('gulp'),
    browserSync = require('browser-sync').create(), 
    reload = browserSync.reload,   
    $ = require('gulp-load-plugins')(),
    CONF = require('./gulp.config.js'),
    watch = require('gulp-watch'),
    rimraf = require('rimraf'),
    spritesmith = require('gulp.spritesmith'),
    prefixer = require('gulp-autoprefixer'); 
     

// Запуск сервера
gulp.task('serve', function() {
    browserSync.init({
        port: 9000,
        server: {
            baseDir: CONF.distBaseDir
        }
    });
});

// Build html 
gulp.task('html:build', function () {
    gulp.src(CONF.src.html) // Выберем файлы по нужному пути
        .pipe($.plumber())
        .pipe($.rigger()) // Прогоним через rigger
        /*.pipe($.wiredep({ // Вставляем необходимые библиотеки
          derictory: "./src/bower"     
        }))*/
        .pipe(gulp.dest(CONF.build.html)) // Переместим их в папку build
        .pipe(reload({stream:true}));
});

gulp.task('pug:build', function () {
    gulp.src(CONF.src.pug) // Выберем файлы по нужному пути
        .pipe($.pug({
            pretty: true
        })) // Прогоним через pug       
        .pipe(gulp.dest(CONF.build.pug)) // Переместим их в папку build       
});

gulp.task('pug:watch', function () {
    gulp.watch('src/pages/**/*.pug', ['pug:build'])   
});


// Build javascript 
gulp.task('js:build', function () {
    gulp.src(CONF.src.js) // Выберем файлы по нужному пути
        /*.pipe($.rigger())*/ // Прогоним через rigger
       /* .pipe($.uglify())*/ // Сожмем js
        .pipe(gulp.dest(CONF.build.js)) // Переместим готовый файл в build
        .pipe(reload({stream:true}));
});

// Build main styles css
gulp.task('css:build', function () {
    gulp.src(CONF.src.less_src) // Выберем наш style.less
        .pipe($.plumber())
        .pipe($.less()) // Скомпилируем
        .pipe(prefixer({
            browsers: ['> 5%'],
            cascade: false
        })) // Добавим вендорные префиксы
        /*.pipe($.cssnano({zindex: false})) */// Сожмем
        .pipe(gulp.dest(CONF.build.css)) // Переместим в build
        .pipe(reload({stream:true}));
});


// Build main media queries css
gulp.task('css:mediaBuild', function () {
    gulp.src(CONF.src.media_less_src) // Выберем наш style.less
        .pipe($.plumber())
        .pipe($.less()) // Скомпилируем
        .pipe(prefixer({
            browsers: ['> 5%'],
            cascade: false
        })) // Добавим вендорные префиксы
        /*.pipe(cssnano({zindex: false})) */// Сожмем
        .pipe(gulp.dest(CONF.build.media_css)) 
        .pipe(reload({stream:true}));
});

gulp.task('sass', function () {
    gulp.src(CONF.src.sass)
        .pipe($.plumber())
        .pipe(sourcemaps.init()) // write sourcemaps for sass,less,js not install
        .pipe(sassGlob()) // gulp-sass-glob import folders 'section/**/*/*.scss' not install
        .pipe(sass().on('error', sass.logError)) // gulp-sass not install
        .pipe(prefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(CONF.build.sass));
})

gulp.task('image:build', function () {
    gulp.src(CONF.src.img) // Выберем наши картинки
        .pipe($.imagemin({ // Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(CONF.build.img)); // Переместим в build
});


gulp.task('fonts:build', function() {
    gulp.src(CONF.src.fonts)
        .pipe(gulp.dest(CONF.build.fonts)) // Переместим шрифты в build
});

gulp.task('bower-libs:build', function() {
    gulp.src(CONF.src.bower_libs)
        .pipe(gulp.dest(CONF.build.bower_libs)) // Переместим шрифты в build
});

gulp.task('build:sprite', function() {
    var spriteData = 
        gulp.src(CONF.src.img_sprite) // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.less',
                cssFormat: 'css',
                imgPath: '../images/sprite.png'
                padding: 70
            }));

    spriteData.img.pipe(gulp.dest(CONF.build.img)); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest(CONF.src.sprite_less)); // путь, куда сохраняем стили
});

gulp.task('clean-dist', function (cb) {
    rimraf(CONF.clean, cb);
});

gulp.task("build", ["clean-dist"], function () {
    gulp.start("dist");
});

gulp.task('dist', [
    'html:build',
    'js:build',
    'css:build',
    'css:mediaBuild',
    'fonts:build',
    'image:build',
    'bower-libs:build'
]);


gulp.task('watcher', function() {
    watch([CONF.watch.html], function(event, cb) {
        gulp.start('html:build');
    });

    watch([CONF.watch.style_less, CONF.watch.style_main_less], function(event, cb) {
        gulp.start('css:build');
    });
    watch([CONF.watch.style_media_less, CONF.watch.style_main_media_less], function(event, cb) {
        gulp.start('css:mediaBuild');
    });
    watch([CONF.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([CONF.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([CONF.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['watcher', 'serve']);

