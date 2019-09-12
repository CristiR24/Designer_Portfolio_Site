const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const pug = require('gulp-pug');
const gmq = require('gulp-group-css-media-queries');
const zip = require('gulp-zip');
const gm = require('gulp-gm');
const revAll = require('gulp-rev-all');

const browserSync = require('browser-sync').create();
const critical = require('critical').stream;

const {
    src, dest, watch, parallel, series,
} = require('gulp');

const paths = {
    html: {
        src: 'src/**/*.html',
        dest: 'app',
    },
    pug: {
        src: 'src/pug/**/*.pug',
        pages: ['src/pug/**/*.pug', '!src/pug/**/_*.pug'],
        dest: 'src',
    },
    images: {
        src: 'src/images/**/*.+(png|jpg|jpeg|gif|svg)',
        dest: 'app/images',
    },
    toConvert: {
        src: 'src/images/**/*.+(jpg|png|jpeg|gif)',
        dest: 'app/images',
    },
    scss: {
        src: 'src/scss/**/*.scss',
        dest: 'app/css',
    },
    js: {
        src: 'src/js/**/*.js',
        dest: 'app/js',
    },
    toDel: {
        src: ['app/*', 'src/css/*.css', 'src/**/*.html'],
    },
    critical: {
        src: 'app/**/*.html',
        dest: 'app',
    },
    toZip: {
        src: ['app/**/*', '!app/website.zip'],
        dest: 'app',
    },
    revision: {
        src: 'app/**',
        dest: 'app',
    },
};

function server(done) {
    browserSync.init({
        server: {
            baseDir: 'app/',
        },
    });
    done();
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function clean() {
    return del(paths.toDel.src);
}

function html() {
    return src(paths.html.src)
        .pipe(dest(paths.html.dest));
}

function pugCompile() {
    return src(paths.pug.pages)
        .pipe(pug())
        .pipe(dest(paths.pug.dest));
}

function images() {
    return src(paths.images.src)
        .pipe(dest(paths.images.dest));
}

function convert() {
    return src(paths.toConvert.src)
        .pipe(gm((gmfile => gmfile.setFormat('webp'))))
        .pipe(dest(paths.toConvert.dest));
}

function styles() {
    return src(paths.scss.src)
        .pipe(sass())
        .pipe(gmq())
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(dest(paths.scss.dest))
        .pipe(browserSync.stream());
}

function script() {
    return src(paths.js.src)
        .pipe(babel({
            presets: ['@babel/preset-env'],
        }))
        .pipe(terser())
        .pipe(dest(paths.js.dest));
}

function criticalCSS() {
    return src(paths.critical.src)
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
        .pipe(dest(paths.critical.dest));
}

function zipSite() {
    return src(paths.toZip.src)
        .pipe(zip('website.zip'))
        .pipe(dest(paths.toZip.dest));
}

function revision() {
    return src(paths.revision.src)
        .pipe(revAll.revision({
            dontRenameFile: ['images/icon/favicon.png', '.html'],
            dontUpdateReference: ['images/icon/favicon.png', '.html'],
        }))
        .pipe(dest(paths.revision.dest));
}

function watchFiles() {
    watch(paths.pug.src, pugCompile);
    watch(paths.html.src, series(html, browserSyncReload));
    watch(paths.images.src, series(images, browserSyncReload));
    watch(paths.toConvert.src, series(convert, browserSyncReload));
    watch(paths.scss.src, styles);
    watch(paths.js.src, series(script, browserSyncReload));
}

// complex tasks
const build = series(clean, parallel(
    series(pugCompile, html),
    styles,
    script,
    images,
    convert,
));
const serve = series(build, parallel(watchFiles, server));
const prod = series(revision, criticalCSS, zipSite);

// export tasks
exports.clean = clean;
exports.html = html;
exports.pugCompile = pugCompile;
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
exports.revision = revision;

exports.default = serve;
