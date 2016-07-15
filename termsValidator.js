function validateSentence(sentence) {
    // 使い方はREADMEを参照ください。
    // https://github.com/kongou-ae/redpen-validator/blob/master/README.md
    /*
    console = {
        log:print
    };
    */
    var terms = [
        /* サンプル
        {
            'expected':'ファイアウォール',
            'pattern':['ファイアーウォール','ファイヤーウォール','ファイヤウォール','ファイヤーウオール'],
            'source':'MyCompany'
        },
        {
            'expected':'こと',
            'pattern':['事'],
            'tokenCheck':['名詞','非自立','事'],
            'source':'MyCompany'
        },
        {
            'expected':'なぜ',
            'pattern':['何故'],
            'source':'MyCompany'
        },
        {
            'expected':'ちょうど',
            'pattern':['丁度'],
            'source':'MyCompany'
        },
        {
            'expected':'なんでも',
            'pattern':['何でも'],
            'source':'MyCompany'
        },
        {
            'expected':'通信事業者',
            'pattern':['通信キャリア'],
            'source':'MyCompany'
        }
        */
    ];

    var morphologicalAnalysis = function(sentence){
        for (var k = 0; k < sentence.tokens.length; k++) {
            if ( sentence.tokens[k].tags[0] === terms[i]['tokenCheck'][0] &&
                 sentence.tokens[k].tags[1] === terms[i]['tokenCheck'][1] && 
                 sentence.tokens[k].tags[6] === terms[i]['tokenCheck'][2] ){
                addError('文書規約違反(' + terms[i]['source'] + ')です。「' + sentence.tokens[k].surface + '」を修正してください。（正：' + terms[i]['expected'] + ' 誤：' + terms[i]['pattern'][j] + '）' , sentence);
            }
        }
    }

    for ( var i = 0; i < terms.length; i++ ) {
        for ( var j = 0; j < terms[i]['pattern'].length; j++ ) {
            var regex = new RegExp( terms[i]['pattern'][j]);
            if ( 'tokenCheck' in terms[i] ) {
                morphologicalAnalysis(sentence);
            } else {
                if ( sentence.content.match(regex) ) {
                    addError('文書規約違反(' + terms[i]['source'] + ')です。「' + terms[i]['pattern'][j] + '」を「' + terms[i]['expected'] + '」に修正してください', sentence);
                }
            }
        }
    }
}