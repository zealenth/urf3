module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            'dist/deps.js',
            'app/**/*.js'
        ]
    });
};