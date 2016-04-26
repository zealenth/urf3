var gulp = require( 'gulp' );
var ngdocs = require( 'gulp-ngdocs' );
var plumber = require( 'gulp-plumber' );
var babel = require( 'gulp-babel' );
var del = require( 'del' );
var cached = require( 'gulp-cached' );
var concat = require( 'gulp-concat' );
var remember = require( 'gulp-remember' );
var argv = require( 'yargs' ).argv;
var gulpif = require( 'gulp-if' );
var sourcemaps = require( 'gulp-sourcemaps' );
var minifyCss = require( 'gulp-minify-css' );
var printFilenames = require( 'gulp-print' );
var ngAnnotate = require( 'gulp-ng-annotate' );
var header = require( 'gulp-header' );
var footer = require( 'gulp-footer' );
var CombinedStream = require( 'combined-stream' );
var runSequence = require( 'run-sequence' );
var Server = require('karma').Server;

var jscs = require( 'gulp-jscs' );
var jshint = require( 'gulp-jshint' );
var stylish = require('jshint-stylish');

var template = require( 'gulp-template' );
var templateCache = require( 'gulp-angular-templatecache' );

var sass = require( 'gulp-sass' );
var uglify = require( 'gulp-uglify' );

var minify = false;
var includeMaps = true;

if ( argv.m ) {
    minify = true;
}

var deps = require( './deps' );

var globs = {
    app: {
        js: [
            'app/app.js', 'app/**/module.js', 'app/**/*.js', '!app/**/*.spec.js', '!app/**/*.spec-helper.js'
        ],
        sass: 'app/**/*.scss',
        template: [ 'app/**/*.tpl.html' ]
    },
    assets: {
        files: [],
        imgs: [],
        bower: []
    },
    bower: {
        css: [
            'bower_components/angular-material/angular-material.css'
        ],
        js: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-aria/angular-aria.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/lodash/dist/lodash.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.js',
            'bower_components/socket.io-client/socket.io.js'
        ]
    },
    build: {
        js: [ 'gulpfile.js', 'deps.js', 'globs.js' ]
    },
    node: {
        js: 'test/unit/unit.js'
    },
    unit: {
    // Run in browser with tests
        helper: {
            js: [ 'app/**/*.spec-helper.js', 'test/unit/polyfill.js' ]
        },
        node: {
            js: 'test/unit/unit.js'
        },
        // Tests
        spec: {
            js: 'app/**/*.spec.js'
        }
    }
}

function miniName( filename ) {
    return minify ? path.basename( filename, path.extname( filename ) ) + '.min' +  path.extname( filename ) : filename;
}

gulp.task( 'clean', function( cb ) {
    del( [
        'deploy.zip',
        'dist',
        'docs'
    ]).then( function() {
        cb();
    });
} );

gulp.task( 'copyAssets', function() {
    return gulp.src( globs.assets.bower )
            .pipe( gulp.dest( 'dist/' ) ) &&
        gulp.src( globs.assets.files )
            .pipe( gulp.dest( 'dist/app/assets' ) ) &&
        gulp.src( globs.assets.imgs )
            .pipe( gulp.dest( 'dist/app/img' ) );
} );


gulp.task( 'docs', function() {
    gulp.src( globs.app.js )
        .pipe( plumber( {
            errorHandler: function( err ) {
                console.log( err );
                this.emit( 'end' );
            }
        } ) )
        .pipe( ngdocs.process() )
        .pipe( gulp.dest( './docs' ) );
} );

gulp.task( 'check', function() {
    return gulp.src( globs.app.js )
        .pipe( plumber( {
            errorHandler: function( err ) {
                console.log( err );
                this.emit( 'end' );
            }
        } ) )
        .pipe( cached( 'check' ) )
        .pipe( jshint() )
        .pipe( jscs() )
        .on( 'error', function(error) { console.log( error );} )
        .pipe( remember( 'check' ) )
        .pipe( jshint.reporter( stylish ) )
        .pipe( jshint.reporter( 'fail' ) )
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'))
} );

gulp.task( 'html', function() {
    var scripts = minify ? deps.scripts.minified() : deps.scripts.unminified();
    var stylesheets = minify ? deps.stylesheets.minified() : deps.stylesheets.unminified();

    return gulp.src( 'app/index.html' )
        .pipe( template( { scripts: scripts, stylesheets: stylesheets } ) )
        .pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'css', function() {
    return gulp.src( globs.app.sass )
        .pipe( plumber( {
            errorHandler: function( err ) {
                console.log( err );
                this.emit( 'end' );
            }
        } ) )
        .pipe( sass() )
        .pipe( gulpif( includeMaps, sourcemaps.init() ) )
        .pipe( concat( miniName( 'app.css' ) ) )
        .pipe( gulpif( minify, minifyCss() ) )
        .pipe( gulpif( includeMaps, sourcemaps.write() ) )
        .pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'css-deps', function() {
    return gulp.src( globs.bower.css )
        .pipe( gulpif( includeMaps, sourcemaps.init() ) )
        .pipe( concat( miniName( 'deps.css' ) ) )
        .pipe( gulpif( minify, minifyCss() ) )
        .pipe( gulpif( includeMaps, sourcemaps.write( { sourceRoot: 'bower_components' } ) ) )
        .pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'js', function() {
    handleErrors = true;
    var srcStream = gulp.src( globs.app.js )
        .pipe( plumber( {
            errorHandler: function( err ) {
                console.log( err );
                this.emit( 'end' );
            }
        } ) )
        .pipe( cached( 'js-src' ) )
        .pipe( printFilenames() )
        .pipe( gulpif( includeMaps, sourcemaps.init() ) )
        .pipe( babel() )
        // XXX: Remove vanity spaces to avoid sourcemapping problems; header and footer plugins do not yet support
        // sourcemaps.  May still interfere with minified mappings.
        .pipe( ngAnnotate( { 'single_quotes': true, gulpWarnings: false } ) )
        .pipe( header( ';(function(){\'use strict\';' ) )
        .pipe( footer( '})();' ) )
        .pipe( remember( 'js-src' ) );

    var tplStream = gulp.src( globs.app.template )
        .pipe( gulpif( includeMaps, sourcemaps.init() ) )
        // TODO: Add optional html minification here?
        .pipe( templateCache( { module: 'urf3.templates', standalone: true } ) )
        .pipe( remember( 'js-tmpl') );

    return CombinedStream.create()
        .append( srcStream )
        .append( tplStream )
        .pipe( concat( miniName( 'app.js' ) ) )
        .pipe( gulpif( minify, uglify() ) )
        .pipe( gulpif( includeMaps, sourcemaps.write() ) )
        .pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'js-deps', function() {
    return gulp.src( globs.bower.js )
        .pipe( printFilenames() )
        .pipe( gulpif( includeMaps, sourcemaps.init() ) )
        .pipe( concat( miniName( 'deps.js' ) ) )
        .pipe( gulpif( minify, uglify() ) )
        .pipe( gulpif( includeMaps, sourcemaps.write( { sourceRoot: 'bower_components' } ) ) )
        .pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'default', function( cb ) {
    runSequence( 'clean', 'check', 'build', 'test', 'docs', cb );
} );

gulp.task( 'watch', [ 'build', 'docs' ], function() {
    gulp.start( 'check' );  // Run once to kick things off, after build steps for readability
    gulp.start( 'copyAssets' );
    gulp.start( 'test-watch' );
    //TODO: Add watch functionality for assets.

    gulp.watch( [ 'app/index.html' ], [ 'html' ] );

    gulp.watch( globs.app.js.concat( globs.app.template ), function() {
            runSequence( 'js', [ 'check', 'js' ] );
        } )
        .on( 'change', function( event ) {
            // If a file is deleted, forget about it
            if ( event.type === 'deleted' ) {
                delete cached.caches[ 'js-src' ][ event.path ];
                delete cached.caches[ 'js-tpl' ][ event.path ];
                remember.forget( 'js-src', event.path );
                remember.forget( 'js-tpl', event.path );
            }
        } );

    //gulp.watch( unitGlob, [ 'check' ] );

    gulp.watch( globs.bower.js, [ 'js-deps' ] );

    gulp.watch( globs.app.sass, [ 'css' ] );

    gulp.watch( globs.bower.css, [ 'css-deps' ] );

    //gulp.watch( nodeGlob, [ 'check' ] );
} );

gulp.task( 'release', function( cb ) {
    includeMaps = false;
    handleErrors = false;

    // Build, test, and distribute both minified and unminified code

    minify = true;
    //TODO: Add tests
    runSequence( 'build', cb );

} );

gulp.task( 'test', function( cb ) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, cb).start();
} );

gulp.task( 'test-watch', function( cb ) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false,
        autoWatch: true
    }, cb).start();
} );

gulp.task( 'debug', function( cb ) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
} );

gulp.task( 'build', [ 'check', 'css', 'css-deps', 'html', 'js', 'js-deps', 'copyAssets' ] );
