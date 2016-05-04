module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        files: [
            '//www.google.com/recaptcha/api.js?render=explicit&onload=vcRecaptchaApiLoaded',
            'dist/deps.js',
            'dist/app.js',
            'app/**/*.spec.js'
        ]
    });
};