module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        files: [
            {
                pattern: "tests/release/libs/*.js",
                watched: false
            },
            {
                pattern: "tests/release/src/*.js",
                watched: false
            },
            {
                pattern: "tests/*_Specs.js",
                watched: false
            }
        ],
        reporters: ["progress", "html"],
        htmlReporter: {
            outputDir: "tests/release/reports",
            templatePath: __dirname + "/node_modules/karma-html-reporter/jasmine_template.html"
        },
        port: 9877,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ["Chrome"],
        singleRun: true
    });
};