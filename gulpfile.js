const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const pug = require('gulp-pug');
const rename = require('gulp-rename');

const browserSync = require('browser-sync').create();
const gm = require('gm');

const fs = require('fs');
const { sep } = require('path');

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

function convertImg(path) {
    const fileName = path.match(/\w+\.(jpg|png|jpeg|gif)/)[0];
    const convertPath = path.replace(/src/, 'app')
        .replace(/\.(jpg|png)/, '.webp');
    gm(path)
        .setFormat('webp')
        .write(convertPath, (error) => {
            if (error) throw error;
            // log 'fileName' with blue
            console.log('\x1b[34m%s\x1b[0m', fileName, 'converted');
        });
}

function convertAll(done) {
    const readDir = dir => (
        fs.readdirSync(dir).map(path => dir + sep + path)
    );
    function convertImages(dirPaths) {
        for (const path of dirPaths) {
            fs.stat(path, (err, stats) => {
                if (err) throw err;
                if (stats.isDirectory()) {
                    convertImages(readDir(path));
                } else if (path.match(/\w+\.(jpg|png|jpeg|gif)/)) {
                    convertImg(path);
                }
            });
        }
    }
    const imagePaths = readDir('src/images');
    convertImages(imagePaths);
    done();
}

function styles() {
    return src(dirs.scss)
        .pipe(sass())
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
    watch(dirs.scss, styles);
    watch(dirs.js, parallel(script, browserSyncReload));

    watch('src/images/**/*.+(png|jpg|jpeg|gif)')
        .on('change', (path) => {
            convertImg(path);
        });
    watch('src/images/**/*.+(png|jpg|jpeg|gif)')
        .on('add', (path) => {
            convertImg(path);
        });
}

// complex tasks
const build = series(clean, parallel(
    html, pugCompile, fonts, styles, script, series(images, convertAll),
));
const serve = series(build, parallel(watchFiles, server));

// export tasks
exports.clean = clean;
exports.html = html;
exports.pugCompile = pugCompile;
exports.fonts = fonts;
exports.images = images;
exports.styles = styles;
exports.script = script;
exports.watchFiles = watchFiles;
exports.build = build;
exports.serve = serve;

exports.convertImg = convertImg;
exports.convertAll = convertAll;

exports.default = serve;
