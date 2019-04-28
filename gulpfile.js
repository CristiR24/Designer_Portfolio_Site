const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const pug = require("gulp-pug");

const {src, dest, watch, parallel, series} = require("gulp");

const dir = {
    html: "src/*.html",
    pug: "src/pug/**/*.pug",
    pugPages: "src/pug/*.pug",
    fonts: "src/fonts/**/*.otf",
    images: "src/images/**/*.+(png|jpg|jpeg|gif|svg)",
    scss: "src/scss/**/*.scss",
    css: "src/css",
    js: "src/js/**/*.js"
};

function server(done) {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
    done();
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function clean() {
    return del(["app/*", "src/css/*.css"]);
}

function html() {
    return src(dir.html)
        .pipe(dest("app"));
}

function pugCompile() {
    return src(dir.pugPages)
        .pipe(pug())
        .pipe(dest("src"));
}

function fonts() {
    return src(dir.fonts)
        .pipe(dest("app/fonts"));
}

function images() {
    return src(dir.images)
        .pipe(dest("app/images"))
}

function styles() {
    return src(dir.scss)
        .pipe(sass())
        .pipe(dest(dir.css))
        .pipe(autoprefixer(["last 15 versions"]))
        .pipe(cleanCSS())
        .pipe(dest("app/css"))
        .pipe(browserSync.stream());
}

function script() {
    return src(dir.js)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(dest("app/js"));
}

function watchFiles() {
    watch(dir.pug, pugCompile);
    watch(dir.html, parallel(html, browserSyncReload));
    watch(dir.fonts, parallel(fonts, browserSyncReload));
    watch(dir.images, parallel(images, browserSyncReload));
    watch(dir.scss, styles);
    watch(dir.js, parallel(script, browserSyncReload));
}

// complex tasks
const build = series(clean, parallel(html, pugCompile, fonts, images, styles, script));
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

exports.default = serve;
