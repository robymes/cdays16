module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        files: [
            {
                pattern: "tests/debug/libs/*.js",
                watched: false
            },
            {
                pattern: "tests/debug/src/*.js",
                watched: false
            },
            {
                pattern: "tests/*_Specs.js",
                watched: false
            }
        ],
        reporters: ["progress", "html", "coverage"],
        htmlReporter: {
            outputDir: "tests/debug/reports",
            templatePath: __dirname + "/node_modules/karma-html-reporter/jasmine_template.html"
        },
        preprocessors: {
            "tests/debug/src/*.js": ["coverage"]
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