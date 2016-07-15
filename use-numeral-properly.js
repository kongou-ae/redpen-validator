function validateSentence(sentence) {
    // 参考
    // https://www.jtf.jp/jp/style_guide/pdf/jtf_style_guide.pdf
    // 2.2.2. 算用数字と漢数字の使い分け
    // 数量を表現し、数を数えられるものは算用数字を使用します。任意の数に置き換えても通用する語句がこれに該当します。序数詞（「第～回」「～番目」「～回目」）も算用数字を使います。

    var terms = [
        {
            'expected':'1',
            'pattern':['一'],
            'tokenCheck':['名詞','数','[一二三四五六七八九十百千]']
        },
        // ただし、漢数字が望ましいものは個別に算用数字をエラーとする。
        {
            'expected':'[一-九]つ',
            'pattern':['[1-9]つ']
        },
        {
            'expected':'[一-九]次',
            'pattern':['[1-9]次']
        },
        {
            'expected':'五大陸',
            'pattern':['5大陸']
        }
    ];

    var tokenCheck = function (sentence){
        for (var k = 0; k < sentence.tokens.length; k++) {
            if (
                 sentence.tokens[k].tags[0] === terms[i]['tokenCheck'][0] &&
                 sentence.tokens[k].tags[1] === terms[i]['tokenCheck'][1] &&　
                 sentence.tokens[k].tags[6].match(new RegExp(terms[i]['tokenCheck'][2]))
            ){
                // 「名詞で数の漢数字は算用数字であるべし」の正規表現に引っかかってしまったものの中から、漢数字が正しい表現を除外する
                if ( (k > 0 && sentence.tokens[k - 1].tags[6] === '数') ||
                     (k < sentence.tokens.length - 1 && sentence.tokens[k].tags[6].match(new RegExp(terms[i]['tokenCheck'][2])) && sentence.tokens[k+1].tags[6]==='次') ||
                     (k < sentence.tokens.length - 1 && sentence.tokens[k].tags[6].match(new RegExp(terms[i]['tokenCheck'][2])) && sentence.tokens[k+1].tags[6]==='大陸')){
                } else {
                    addError('「' + sentence.tokens[k].surface + '」は数字の使い方が間違っています。（誤：' + terms[i]['pattern'][j] + '　正：' + terms[i]['expected'] + '）' , sentence );
                }
            }
        }
    }


    for ( var i = 0; i < terms.length; i++ ) {
        for ( var j = 0; j < terms[i]['pattern'].length; j++ ) {
            var regex = new RegExp( terms[i]['pattern'][j]);
            // 形態素解析するかどうか
            if ( 'tokenCheck'　in terms[i] ) {
                tokenCheck(sentence);
            } else {
                if ( sentence.content.match(regex) ) {
                    addError('「' + terms[i]['pattern'][j] + '」を「' + terms[i]['expected'] + '」に修正してください', sentence);
                }
            }
        }
    }
}