function validateSentence(sentence) {
    // 参考
    // https://www.jtf.jp/jp/style_guide/pdf/jtf_style_guide.pdf
    // 2.2.3. 一部の助数詞の表記
    // 助数詞にともなう「ヵ」、「か」、「カ」、「ヶ」、「ケ」、「箇」、「個」の表記は、原則として、ひらがなの「か」を使います。

    var terms = [
        {
            'expected':'か',
            'pattern':['ヵ、カ、ヶ、ケ、箇、個'],
            'tokenCheck':['名詞','接尾','[ヵカヶケ箇個][月所国年]']
        },
        {
          'expected':'か月',
          'pattern':['個月'],
        }
    ];

    var tokenCheck = function (sentence){
        for (var k = 0; k < sentence.tokens.length; k++) {
            if (
                 sentence.tokens[k].tags[0] == terms[i]['tokenCheck'][0] &&
                 sentence.tokens[k].tags[1] == terms[i]['tokenCheck'][1] &&　
                 sentence.tokens[k].tags[6].match(new RegExp(terms[i]['tokenCheck'][2]))
               ){
                addError('「' + sentence.tokens[k].surface + '」を修正してください。助数詞にともなう「ヵかカヶケ箇個」の表記は、原則として、ひらがなの「か」を使います。' , sentence);
            };
        };
    };

    for ( var i = 0; i < terms.length; i++ ) {
        for ( var j = 0; j < terms[i]['pattern'].length; j++ ) {
            var regex = new RegExp( terms[i]['pattern'][j]);
            // 形態素解析するかどうか
            if ( 'tokenCheck'　in terms[i] ) {
                tokenCheck(sentence);
            } else {
                if ( sentence.content.match(regex) ) {
                    addError('「' + terms[i]['pattern'][j] + '」を「' + terms[i]['expected'] + '」に修正してください。助数詞にともなう「ヵかカヶケ箇個」の表記は、原則として、ひらがなの「か」を使います。', sentence);
                }
            };
        };
    };
};
