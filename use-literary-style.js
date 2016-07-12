function validateSentence(sentence) {
    //　使い方はREADMEを参照ください。
    // https://github.com/kongou-ae/redpen-validator/blob/master/README.md
    /*
    console = {
        log:print
    };
    */
    var terms = [
        {
            'expected':'過度に',
            'pattern':['あまりに'],
        },
        {
            'expected':'一度に／一括して／まとめて',
            'pattern':['いっぺんに'],
        },
    ];

    var morphologicalAnalysis = function(sentence){
        for (var k = 0; k < sentence.tokens.length; k++) {
            if ( sentence.tokens[k].tags[0] == terms[i]['tokenCheck'][0] &&
                 sentence.tokens[k].tags[1] == terms[i]['tokenCheck'][1] &&　
                 sentence.tokens[k].tags[6] == terms[i]['tokenCheck'][2] ){
                addError('「' + sentence.tokens[k].surface + '」は口語です。（正：' + terms[i]['expected'] + '　誤：' + terms[i]['pattern'][j] + '）' , sentence);
            }
        };
    }

    for ( var i = 0; i < terms.length; i++ ) {
        for ( var j = 0; j < terms[i]['pattern'].length; j++ ) {
            var regex = new RegExp( terms[i]['pattern'][j]);
            if ( 'tokenCheck'　in terms[i] ) {
                morphologicalAnalysis(sentence);
            } else {
                if ( sentence.content.match(regex) ) {
                  addError('「' + sentence.tokens[k].surface + '」は口語です。（正：' + terms[i]['expected'] + '　誤：' + terms[i]['pattern'][j] + '）' , sentence);
                }
            };
        };
    };
};
