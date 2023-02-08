// Inicialização dos módulos
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minify = require('gulp-clean-css');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Sass task - compila os arquivos sass
function scssTask() {
    return src('app/scss/style.scss', { sourcemaps: true })
        .pipe(sass())
        .pipe(postcss([autoprefixer('last 3 versions'), cssnano()]))
        .pipe(minify())
        .pipe(dest('dist/css', { sourcemaps: '.' }))
}

// Js task - compila o arquivo js
function jsTask() {
    return src('app/js/script.js', { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(terser())
        .pipe(dest('dist/js', { sourcemaps: '.' }))
}

// Browsersync - auto reload para mudanças no navegador
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.'
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            }
        }
    });
    cb();
}

function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

// watch task - aplicar o reload sempre que houver mudanças
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(
        ['app/scss/**/*.scss', 'app/**/*.js'],
        series(scssTask, jsTask, browserSyncReload)
    );
}

// Default gulp task 
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
