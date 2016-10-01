var gulp = require("gulp"),
    concat = require("gulp-concat"),
    eslint = require("gulp-eslint"),
    uglify = require("gulp-uglify"),
    sourcemaps = require("gulp-sourcemaps"),
    KarmaServer = require("karma").Server,
    bowerMain = require("bower-main"),
    del = require("del"),
    bowerMainJavaScriptFiles = bowerMain("js", "min.js"),
    bowerMainCssFiles = bowerMain("css", "min.css"),
    paths = {
        eslintrc: [
            ".eslintrc.json"
        ],
        libs: [
            "sln/bin/release/js/jquery.min.js",
            "sln/bin/release/js/linq.min.js",
            "sln/bin/release/js/moment-with-locales.min.js",
            "sln/bin/release/js/bootstrap.min.js"
        ],
        src: [
            "sln/src/ToDoListViewModel.js",
            "sln/src/App.js"
        ],
        testSrc: [
            "sln/src/ToDoListViewModel.js"
        ],
        testSrcDebug: [
            "tests/debug/js/testDebug.js"
        ],
        testSrcRelease: [
            "tests/release/js/testRelease.min.js"
        ],
        specs: [
            "tests/*_Specs.js"
        ],
        srcDebug: [
            "sln/scripts/mytodo.js"
        ],
        srcRelease: [
            "sln/scripts/mytodo.min.js"
        ]
    };

gulp.task("copyProdNotMinJs", function() {
    return gulp.src(bowerMainJavaScriptFiles.minifiedNotFound)
        .pipe(gulp.dest("sln/scripts"));
});

gulp.task("copyProdJs", ["copyProdNotMinJs"], function() {
    return gulp.src(bowerMainJavaScriptFiles.minified)
        .pipe(gulp.dest("sln/scripts"));
});

gulp.task("copySourceMaps", function() {
    return gulp.src(["bower_components/jquery/dist/*.map"])
        .pipe(gulp.dest("sln/scripts"));
});

gulp.task("copyJs", ["copyProdJs", "copySourceMaps"]);

gulp.task("copyProdNotMinCss", function() {
    return gulp.src(bowerMainCssFiles.minifiedNotFound)
        .pipe(gulp.dest("sln/styles"));
});

gulp.task("copyProdCss", ["copyProdNotMinCss"], function() {
    return gulp.src(bowerMainCssFiles.minified)
        .pipe(gulp.dest("sln/styles"));
});

gulp.task("copyCss", ["copyProdCss"]);

gulp.task("copyFonts", function() {
    return gulp.src(["bower_components/bootstrap/dist/fonts/*.*"])
        .pipe(gulp.dest("sln/fonts"));
});

gulp.task("clean", function(callback) {
    del(["sln/scripts/**/*", "sln/styles/**/*", "sln/fonts/**/*"], {
        force: true
    }, callback);
});

gulp.task("copyRefs", ["clean", "copyJs", "copyCss", "copyFonts"]);

gulp.task("checkLinter", function() {
    return gulp.src(paths.src)
        .pipe(eslint(paths.eslintrc))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on("error", function(error) {
            console.error(String(error));
        });
});

//NOTA: vengono testati solo i sorgenti NON legati alla UI (HTML DOM)
//per testare tutta la codebase è necessario condurre test di page automation

gulp.task("prepareTestsDebug", ["checkLinter"], function() {
    return gulp.src(paths.testSrc)
        .pipe(concat("testDebug.js"))
        .pipe(gulp.dest("tests/debug/js"));
});

gulp.task("testsDebug", ["prepareTestsDebug"], function(done) {
    new KarmaServer({
        configFile: __dirname + "/karma.debug.js",
        singleRun: true
    }, done)
    .start();
});

//Creazione del file sorgente di debug, utile per il debug step-by-step
//con i devtools del browser

gulp.task("debug", function() {
    return gulp.src(paths.src)
        .pipe(concat("mytodo.js"))
        .pipe(gulp.dest("sln/scripts"));
});

gulp.task("buildDebug", ["testsDebug", "debug"]);

gulp.task("prepareTestsRelease", ["checkLinter"], function() {
    return gulp.src(paths.testSrc)
        .pipe(concat("testRelease.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("tests/release/js"));
});

gulp.task("testsRelease", ["prepareTestsRelease"], function(done) {
    new KarmaServer({
        configFile: __dirname + "/karma.release.js",
        singleRun: true
    }, done)
    .start();
});

//Creazione del file sorgente di release minificato

gulp.task("release", function() {
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat("mytodo.min.js"))
        .pipe(sourcemaps.write("./", {
            sourceMappingURL: function(file) {
                return file.relative + ".map";
            }
        }))
        .pipe(gulp.dest("sln/scripts"));
});

gulp.task("buildRelease", ["testsRelease", "release"]);

gulp.task("build", ["buildDebug", "buildRelease"]);

gulp.task("default", ["build"]);