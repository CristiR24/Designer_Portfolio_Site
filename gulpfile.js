const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const gmq = require('gulp-group-css-media-queries');
const zip = require('gulp-zip');
const ggm = require('gulp-gm');

const browserSync = require('browser-sync').create();
const critical = require('critical').stream;

const {
    src, dest, watch, parallel, series,
} = require('gulp');

const dirs = {
    html: 'src/*.html',
    pug: 'src/pug/**/*.pug',
    pugPages: 'src/pug/*.pug',
    fonts: 'src/fonts/**/*.otf',
    images: 'src/images/**/*.+(png|jpg|jpeg|gif|svg)',
    scss: 'src/scss/**/*.scss',
    css: 'src/css',
    js: 'src/js/**/*.js',
};

function server(done) {
    browserSync.init({
        server: {
            baseDir: 'app',
        },
    });
    done();
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function clean() {
    return del(['app/*', 'src/css/*.css']);
}

function html() {
    return src('src/kings-tailor-shop.html')
        .pipe(rename('/kings-tailor-shop/index.html'))
        .pipe(dest('app'))
        .pipe(src('src/kts-realpixels.html'))
        .pipe(rename('/kings-tailor-shop/realpixels.html'))
        .pipe(dest('app'))
        .pipe(src(['src/*.html',
            '!src/kings-tailor-shop.html',
            '!src/kts-realpixels.html']))
        .pipe(dest('app'));
}

function criticalCSS() {
    return src('app/**/*.html')
        .pipe(critical({
            inline: true,
            dimensions: [{
                width: 320,
            }, {
                width: 730,
            }, {
                width: 890,
            }, {
                width: 1020,
            }, {
                width: 1240,
            }],
        }))
        .pipe(dest('app'));
}

function zipSite() {
    return src(['app/**/*', '!app/website.zip'])
        .pipe(zip('website.zip'))
        .pipe(dest('app'));
}

function pugCompile() {
    return src(dirs.pugPages)
        .pipe(pug())
        .pipe(dest('src'));
}

function fonts() {
    return src(dirs.fonts)
        .pipe(dest('app/fonts'));
}

function images() {
    return src(dirs.images)
        .pipe(dest('app/images'));
}

function convert() {
    return src('src/images/**/*.+(jpg|png|jpeg|gif)')
        .pipe(ggm((gmfile => gmfile.setFormat('webp'))))
        .pipe(dest('app/images'));
}

function styles() {
    return src(dirs.scss)
        .pipe(sass())
        .pipe(gmq())
        .pipe(dest(dirs.css))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function script() {
    return src(dirs.js)
        .pipe(babel({
            presets: ['@babel/preset-env'],
        }))
        .pipe(terser())
        .pipe(dest('app/js'));
}

function watchFiles() {
    watch(dirs.pug, pugCompile);
    watch(dirs.html, parallel(html, browserSyncReload));
    watch(dirs.fonts, parallel(fonts, browserSyncReload));
    watch(dirs.images, parallel(images, browserSyncReload));
    watch('src/images/**/*.+(jpg|png|jpeg|gif)', parallel(convert, browserSyncReload));
    watch(dirs.scss, styles);
    watch(dirs.js, parallel(script, browserSyncReload));
}

// complex tasks
const build = series(clean, parallel(
    html,
    pugCompile,
    fonts,
    styles,
    script,
    images,
    convert,
));
const serve = series(build, parallel(watchFiles, server));
const prod = series(criticalCSS, zipSite);

// export tasks
exports.clean = clean;
exports.html = html;
exports.pugCompile = pugCompile;
exports.fonts = fonts;
exports.images = images;
exports.convert = convert;
exports.styles = styles;
exports.script = script;
exports.watchFiles = watchFiles;
exports.build = build;
exports.serve = serve;

exports.prod = prod;
exports.zipSite = zipSite;
exports.criticalCSS = criticalCSS;

exports.default = serve;
