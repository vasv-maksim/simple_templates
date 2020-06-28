// Основа отсюда:
// https://habr.com/ru/post/250569/
'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'), // Наблюдение за изменениями в проекте
    prefixer = require('gulp-autoprefixer'), // Автоматическая расстановка вендорных префиксов css-свойств
    uglify = require('gulp-uglify'), // Сжатие js-кода
    sass = require('gulp-sass'),  // Компиляция sass кода
    sourcemaps = require('gulp-sourcemaps'), // Отладка sass  кода
    rigger = require('gulp-rigger'), // Объединить файлы в один
    cssmin = require('gulp-minify-css'), // Сжатие css-кода
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;


var path = {
    build: { // Готовые файлы после сборки
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { // Исходные файлы
        html: 'src/*.html', 
        js: 'src/js/main.js',
        style: 'src/sass/main.scss',
        img: 'src/img/**/*.*', 
        fonts: 'src/fonts/**/*.*'
    },
    watch: { // Наблюдать за изменениями исходных файлов
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build' // Папку build нужно чистить при пересборке 
};

// Настройки dev-сервера
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

// html
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выбрать файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) // Поместить в папку build
        .pipe(reload({stream: true})); // Перезагрузить сервер
});

// js
gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найти main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализировать sourcemap
        .pipe(uglify()) //Сжать  js
        .pipe(sourcemaps.write()) // Прописать карты
        .pipe(gulp.dest(path.build.js)) // Поместить готовый файл в build
        .pipe(reload({stream: true})); 
});

// css
gulp.task('style:build', function () {
    gulp.src(path.src.style) // Выберать main.scss
        .pipe(sourcemaps.init()) 
        .pipe(sass()) // Скомпилировать css
        .pipe(prefixer()) //Добавить вендорные префиксы
        .pipe(cssmin()) // Сжать css
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) 
        .pipe(reload({stream: true})); 
});

// Картинки
gulp.task('image:build', function () {
    gulp.src(path.src.img) // Выбрать картинки
        .pipe(imagemin({ // Сжать изображения
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) 
        .pipe(reload({stream: true}));
});

// Шрифты
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// Объединить все task выше в один большой
// task  'build'
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

// Наблюдать за исходниками в src
// И если что-то поменялось пересобрать проект
gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

// Запустить dev-сервер с параметрами 
// указанными в config для livereload
gulp.task('webserver', function () {
    browserSync(config);
});

// Очистить файлы в папке build
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// Команда по умолчанию
// запускает всю сборку
//gulp.task('default', ['build', 'webserver', 'watch']);
