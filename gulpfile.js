const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'src/styles/',
    },
    scripts: {
        src: ['src/js/script.js', 'src/js/form.js', 'src/js/testDetail.js'],
        dest: 'src/js/dist',
    },
    html: {
        src: 'src/index.html',
        dest: 'src/',
    },
    html1: {
        src: 'src/1.html',
        dest: 'src/',
    },
    html2: {
        src: 'src/2.html',
        dest: 'src/',
    },
    html3: {
        src: 'src/3.html',
        dest: 'src/',
    },
    html4: {
        src: 'src/4.html',
        dest: 'src/',
    },
    html_form_1: {
        src: 'src/1_form.html',
        dest: 'src/',
    }
};

// Компиляция SCSS в CSS
function compileStyles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream()); // Обновление стилей в браузере
}

// Преобразование JS в ES5
function transpileScripts() {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream()); // Обновление скриптов в браузере
}

// Обновление страницы в браузере для первого HTML
function reloadHtml() {
    return gulp.src(paths.html.src)
        .pipe(browserSync.stream());
}

// Обновление страницы в браузере для второго HTML
function reloadHtml2() {
    return gulp.src(paths.html2.src)
        .pipe(browserSync.stream());
}

function reloadHtmlForm1() {
    return gulp.src(paths.html_form_1.src)
        .pipe(browserSync.stream());
}

// Наблюдение за изменениями в файлах
function watchFiles() {
    browserSync.init({
        server: {
            baseDir: 'src/'
        },
        port: 3000, // Опционально: указать порт
        notify: false // Скрывает уведомления в браузере
    });
    gulp.watch(paths.styles.src, compileStyles);
    gulp.watch(paths.scripts.src, transpileScripts);
    gulp.watch(paths.html.src, reloadHtml); // Наблюдение за первым HTML
    gulp.watch(paths.html2.src, reloadHtml2); // Наблюдение за вторым HTML
    gulp.watch(paths.html_form_1.src, reloadHtmlForm1); // Наблюдение за вторым HTML
}

// Задачи по умолчанию
const build = gulp.series(compileStyles, transpileScripts);
gulp.task('default', gulp.parallel(build, watchFiles));
