'use strict';

var _ = require( 'lodash' );

var scripts = [
    'deps',
    'app'
];

var css = [
    'deps',
    'app'
];

module.exports = {
    scripts: {
        unminified: function() {
            return _.map( scripts, function( script ) {
                return script + '.js';
            } );
        },
        minified: function() {
            return _.map( scripts, function( script ) {
                return script + '.min.js';
            } );
        }
    },
    stylesheets: {
        unminified: function() {
            return _.map( css, function( stylesheet ) {
                return stylesheet + '.css';
            } );
        },
        minified: function() {
            return _.map( css, function( stylesheet ) {
                return stylesheet + '.min.css';
            } );
        }
    }
};
