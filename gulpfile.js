const {src, dest, watch, series, parallel} = require('gulp');

// CSS Y SASS
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// IMAGENES
const imagemin = require('gulp-imagemin');

function css( done) {
    // compilar sass
    // pasos:1- indentificar archivo, 2- compilar, 3 Guardar el .css

    src('src/scss/app.scss')
    .pipe( sourcemaps.init())
    .pipe( sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe( sourcemaps.write('.'))
    .pipe(dest('build/css'))

    done();
}

function imagenes( ) {
    return src('src/img/**/*')
    .pipe(imagemin({optimizationLevel: 3 }) )
    .pipe(dest('build/img'))
}

function dev(){
   watch('src/scss/**/*.scss', css)
   watch ('src/img/**/*', imagenes)
}


exports.css = css;
exports.dev = dev; 
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);

// series -se inicia una tarea y hasta que finaliza inicia la siguiente
// parallet - todas inician al mismo tiempo