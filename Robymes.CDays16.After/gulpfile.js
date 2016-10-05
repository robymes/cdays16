var gulp = require("gulp"),
    concat = require("gulp-concat"),
    eslint = require("gulp-eslint"),
    uglify = require("gulp-uglify"),
    clean = require("gulp-clean"),
    sourcemaps = require("gulp-sourcemaps"),
    KarmaServer = require("karma").Server,
    bowerMain = require("bower-main"),
    bowerMainJavaScriptFiles = bowerMain("js", "min.js"),
    bowerMainCssFiles = bowerMain("css", "min.css"),
    tsLint = require("gulp-tslint"),
    tsc = require("gulp-typescript"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    tsify = require("tsify"),
    tsProject,
    paths = {
        eslintrc: [
            ".eslintrc.json"
        ],
        libs: [
            "sln/obj/js/jquery.min.js",
            "sln/obj/js/bootstrap.min.js",
            "sln/obj/js/bootstrap-datepicker.min.js",
            "sln/obj/js/bootstrap-datepicker.it.min.js",
            "sln/obj/js/json2.js",
            "sln/obj/js/moment-with-locales.min.js",
            "sln/obj/js/linq.min.js",
            "sln/obj/js/knockout.js"
        ],
        srcTs: [
            "sln/src/NewToDoItemViewModel.ts",
            "sln/src/ViewModel.ts",
            "sln/src/App.ts",
        ],
        transpiledTs: "sln/obj/tsTranspiled.js",
        srcJs: [
            "sln/src/Utilities.js",
            "sln/src/ApiService.js",
            "sln/src/ToDoListViewModel.js",
        ],
        testSrc: [
            "sln/src/Utilities.js",
            "sln/src/ApiService.js",
            "sln/src/ToDoListViewModel.js"
        ]
    };

/*** REFERENCES ***/

gulp.task("cleanRefs", function (callback) {
    return gulp.src(["sln/obj", "sln/scripts", "sln/styles", "sln/fonts"], {read: false})
        .pipe(clean());
});

gulp.task("selectNotMinLibs", ["cleanRefs"], function () {
    return gulp.src(bowerMainJavaScriptFiles.minifiedNotFound)
        .pipe(gulp.dest("sln/obj/js"));
});

gulp.task("selectMinLibs", ["selectNotMinLibs"], function () {
    return gulp.src(bowerMainJavaScriptFiles.minified)
        .pipe(gulp.dest("sln/obj/js"));
});

gulp.task("copyLibs", ["selectMinLibs"], function () {
    return gulp.src(paths.libs)
        .pipe(concat("libs.js"))
        .pipe(gulp.dest("sln/scripts"));
});

gulp.task("copyModernizr", ["copyLibs"], function () {
    return gulp.src(["sln/obj/js/modernizr.js"])
        .pipe(gulp.dest("sln/scripts"));
});

gulp.task("cleanObj", ["copyModernizr"], function (callback) {
    return gulp.src(["sln/obj"], {read: false})
        .pipe(clean());
});

gulp.task("copyLibsSourceMaps", ["cleanObj"], function () {
    return gulp.src(["bower_components/jquery/dist/*.map"])
        .pipe(gulp.dest("sln/scripts"));
});

gulp.task("copyNotMinCss", ["copyLibsSourceMaps"], function () {
    return gulp.src(bowerMainCssFiles.minifiedNotFound)
        .pipe(gulp.dest("sln/styles"));
});

gulp.task("copyMinCss", ["copyNotMinCss"], function () {
    return gulp.src(bowerMainCssFiles.minified)
        .pipe(gulp.dest("sln/styles"));
});

gulp.task("copyCss", ["copyMinCss"]);

gulp.task("copyFonts", ["copyCss"], function () {
    return gulp.src(["bower_components/bootstrap/dist/fonts/*.*"])
        .pipe(gulp.dest("sln/fonts"));
});

gulp.task("copyRefs", ["copyFonts"]);

/*** LINTERS ***/

gulp.task("tsLint", function () {
    return gulp.src(paths.srcTs)
        .pipe(tsLint({
            formatter: "verbose"
        }))
        .pipe(tsLint.report());
});

gulp.task("jsLint", function () {
    return gulp.src(paths.srcJs)
        .pipe(eslint(paths.eslintrc))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on("error", function (error) {
            console.error(String(error));
        });
});

/*** TYPESCRIPT TRANSPILING ***/

tsProject = tsc.createProject("tsconfig.json");

gulp.task("tsc", ["tsLint"], function () {
    return gulp.src(paths.srcTs)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject))
        .js.pipe(concat(paths.transpiledTs))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./"));
});

gulp.task("bundleTs", ["tsLint"], function () {
    return browserify({
        basedir: ".",
        debug: true,
        entries: paths.srcTs,
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    //.pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("sln/scripts/"));
});

/*** TEST DEBUG ***/

//NOTA: vengono testati solo i sorgenti NON legati alla UI (HTML DOM)
//per testare tutta la codebase è necessario condurre test di page automation

gulp.task("cleanTestsDebug", ["jsLint"], function (callback) {
    return gulp.src("tests/debug", {read: false})
        .pipe(clean());
});

gulp.task("prepareTestsSrcDebug", ["cleanTestsDebug"], function () {
    return gulp.src(paths.testSrc)
        .pipe(gulp.dest("tests/debug/src"));
});

gulp.task("prepareTestsLibsDebug", ["prepareTestsSrcDebug"], function () {
    return gulp.src(["sln/scripts/libs.js"])
        .pipe(gulp.dest("tests/debug/libs"));
});

gulp.task("testsDebug", ["prepareTestsLibsDebug"], function (done) {
    new KarmaServer({
        configFile: __dirname + "/karma.debug.js",
        singleRun: true
    }, done)
    .start();
});

/*** TEST RELEASE ***/

gulp.task("cleanTestsRelease", ["jsLint"], function (callback) {
    return gulp.src("tests/release", {read: false})
        .pipe(clean());
});

gulp.task("prepareTestsSrcRelease", ["cleanTestsRelease"], function () {
    return gulp.src(paths.testSrc)
        .pipe(gulp.dest("tests/release/src"));
});

gulp.task("prepareTestsLibsRelease", ["prepareTestsSrcRelease"], function () {
    return gulp.src(["sln/scripts/libs.js"])
        .pipe(gulp.dest("tests/release/libs"));
});

gulp.task("testsRelease", ["prepareTestsLibsRelease"], function (done) {
    new KarmaServer({
        configFile: __dirname + "/karma.release.js",
        singleRun: true
    }, done)
    .start();
});

gulp.task("tests", ["testsDebug", "testsRelease"]);

/*** BUILD ***/

gulp.task("buildDebug", ["jsLint"], function () {
    return gulp.src(paths.srcJs)
        .pipe(concat("mytodo.js"))
        .pipe(gulp.dest("sln/scripts"));
});

gulp.task("buildRelease", ["jsLint"], function () {
    return gulp.src(paths.srcJs)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat("mytodo.min.js"))
        .pipe(sourcemaps.write("./", {
            sourceMappingURL: function (file) {
                return file.relative + ".map";
            }
        }))
        .pipe(gulp.dest("sln/scripts"));
});

gulp.task("build", ["buildDebug", "buildRelease"]);

gulp.task("default", ["build", "bundleTs"]);