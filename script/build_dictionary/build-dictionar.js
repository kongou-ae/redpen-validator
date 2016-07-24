'use strict'

var request = require('request');
var argv = require( 'argv' );

var options = {
    name: 'document',
    short: 'd',
    type: 'string',
    description: 'document',
    example: "'script --document=value' or 'script -d value'"
};

var args = argv.option( options ).run();
form.document = args.options.document;
form.lang = 'ja';

var options = {
    url: respenServerURL + 'rest/document/tokenize',
    method: 'POST',
    headers : {
        'Content-Type':'application/x-www-form-urlencoded'
    },
    json: true,
    form: form

request(options, function (error, response, body) {
    if ( error ){
        throw new Error( console.log(error));
    }

    for (var i = 0; i < body.tokens.length; i++){
        tmpDictOjb.tags0 = tokenTags[0];
        tmpDictOjb.tags1 = tokenTags[1].replace(/\s/,'');
        tmpDictOjb.tags6 = tokenTags[6].replace(/\s/,'');
    }
    dictObj.patern = form.document;
    dictObj.tokens = tokens;

