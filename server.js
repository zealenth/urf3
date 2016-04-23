var request = require( 'request' );

var express = require( 'express' );
var compress = require('compression')();
var app = express();

var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );

/* TODO: add db support
 var mongoose = require( 'mongoose' );
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function callback () {
 console.log( 'Connected to MongoDB' );
 });
 */

app.use( compress );
app.use( express.static( __dirname + '/dist' ) );

app.set( 'case sensitive routing', false );

app.get( '/', function( req, res ) {
    res.render( 'index.html' );
} );

var port = process.env.PORT  || process.argv[2] || 80;
//we're passing */model* paths through to port 1337 and serving them with node.
http.listen( port, function() {
    console.log('ready on port: ' + port);
} );
