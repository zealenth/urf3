var request = require( 'request' );

var express = require( 'express' );
var compress = require('compression')();
var app = express();

var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );
var RiotApi = require('./server/utils/riot-api-adapter').RiotApiAdapter;
var riotApi = new RiotApi({ apiKey: process.env.riot_key});
 var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var dbURI = process.env.MONGODB_URI || 'mongodb://localhost/urf3';
mongoose.connect(dbURI);

var db = mongoose.connection;

 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function callback () {
    console.log( 'Connected to MongoDB' );
 });

app.use( compress );
app.use( express.static( __dirname + '/dist' ) );

app.set( 'case sensitive routing', false );

app.get( '/', function( req, res ) {
    res.render( 'index.html' );
} );

//authentication must be done first before adding any other
require('./server/auth/auth.js').createAuthRoutes(app, io, mongoose, riotApi);

require('./server/routes/challenge-routes').initChallengeRoutes(app, io, mongoose, riotApi);

var port = process.env.PORT  || process.argv[2] || 80;
//we're passing */model* paths through to port 1337 and serving them with node.
http.listen( port, function() {
    console.log('ready on port: ' + port);
} );
