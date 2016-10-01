module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        exclude: [
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