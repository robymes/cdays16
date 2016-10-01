module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        exclude: [
        ],
        reporters: ["progress", "html", "coverage"],
        htmlReporter: {
            outputDir: "tests/debug/reports",
            templatePath: __dirname + "/node_modules/karma-html-reporter/jasmine_template.html"
        },
        preprocessors: {
            "obj/debug/js/testDebug.js": ["coverage"]
        },
        coverageReporter: {
            type: "html",
            dir: "tests/debug/coverage/"
        },
        port: 9878,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ["Chrome"],
        singleRun: true
    });
};