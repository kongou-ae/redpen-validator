'use strict'

// RedpenServerのURL
var respenServerURL = 'http://redpen.herokuapp.com/';
// 出力で利用するインデント文字
var indentString = '    ';

var request = require('request');
var argv = require('argv');

var cliOptions = {
    name: 'document',
    short: 'd',
    type: 'string',
    description: 'document',
    example: "'script --document=value' or 'script -d value'"
};

var form = {};
var args = argv.option(cliOptions).run();
form.document = args.options.document;
form.lang = 'ja';

var requestOptions = {
    url: respenServerURL + 'rest/document/tokenize',
    method: 'POST',
    headers : {
        'Content-Type':'application/x-www-form-urlencoded'
    },
    json: true,
    form: form
};

var tokens = [];
var tokenTags = [];
var tmpDictOjb = {};
var dictObj = {};

request(requestOptions, function (error, response, body) {
    if ( error ){
        throw new Error( console.log(error));
    }

    if ( response.statusCode === 200 ) {
        for (var i = 0; i < body.tokens.length; i++){
            tokenTags = body.tokens[i].match(/tags=\[(.*)\]/)[1].split(',');
            tmpDictOjb = {};
            tmpDictOjb.tags0 = tokenTags[0];
            tmpDictOjb.tags1 = tokenTags[1].replace(/\s/,'');
            tmpDictOjb.tags6 = tokenTags[6].replace(/\s/,'');
            tokens.push(tmpDictOjb);

        }
        dictObj.patern = form.document;
        dictObj.tokens = tokens;
        console.log(JSON.stringify(dictObj,null,indentString));
    }
});
