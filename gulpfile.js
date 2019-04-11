const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const cache = require("gulp-cache");
const del = require("del");
const babel = require("gulp-babel");
const terser = require("gulp-terser");

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
    return del(["app/*", "src/css/*"]);
}

function html() {
    return gulp.src("src/*.html").pipe(gulp.dest("app"));
}

function fonts() {
    return gulp.src("src/fonts/**/*.otf").pipe(gulp.dest("app/fonts"));
}

function images() {
    return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(gulp.dest('app/images'))
}

function styles() {
    return gulp
        .src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(autoprefixer(["last 15 versions"]))
        .pipe(cleanCSS())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
}

function script() {
    return gulp
        .src("src/js/**/*.js")
        .pipe(terser())
        .pipe(gulp.dest("app/js"));
}

function watchFiles() {
    gulp.watch("src/*.html", gulp.parallel(html, browserSyncReload));
    gulp.watch("src/Fonts/**/*.otf", gulp.parallel(fonts, browserSyncReload));
    gulp.watch('src/images/**/*.+(png|jpg|jpeg|gif|svg)', gulp.parallel(images, browserSyncReload))
    gulp.watch("src/scss/**/*.scss", styles);
    gulp.watch("src/js/**/*.js", gulp.parallel(script, browserSyncReload));
}

// complex tasks
const build = gulp.series(clean, gulp.parallel(html, fonts, images, styles, script));
const serve = gulp.series(build, gulp.parallel(watchFiles, server));

// export tasks
exports.clean = clean;
exports.html = html;
exports.fonts = fonts;
exports.images = images;
exports.styles = styles;
exports.script = script;
exports.watchFiles = watchFiles;
exports.build = build;
exports.serve = serve;

exports.default = serve;
