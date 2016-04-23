module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            'dist/deps.js',
            'dist/app.js',
            'app/**/*.spec.js'
        ]
    });
};