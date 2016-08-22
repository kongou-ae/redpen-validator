function validateSentence(sentence) {

    var terms = [
        {
            'pattern':'考えられる',
            'message':'断定を避ける表現です。断定系を使ってください。',
            'tokens':[
                {
                    'tags0':'動詞',
                    'tags1':'自立',
                    'tags6':'考える'
                },
                {
                    'tags0':'動詞',
                    'tags1':'接尾',
                    'tags6':'られる'
                }
            ]
        },
        {
            'pattern':'が分かる',
            'message':'断定を避ける表現です。断定系を使ってください。',
            'tokens':[
                {
                    'tags0':'助詞',
                    'tags1':'格助詞',
                    'tags6':'が'
                },
                {
                    'tags0':'動詞',
                    'tags1':'自立',
                    'tags6':'分かる'
                }
            ]
        },
        {
            'pattern':'がわかる',
            'message':'断定を避ける表現です。断定系を使ってください。',
            'tokens':[
                {
                    'tags0':'助詞',
                    'tags1':'格助詞',
                    'tags6':'が'
                },
                {
                    'tags0':'動詞',
                    'tags1':'自立',
                    'tags6':'わかる'
                }
            ]
        },
        {
            'pattern':'と思う',
            'message':'断定を避ける表現です。断定系を使ってください。',
            'tokens':[
                {
                    'tags0':'助詞',
                    'tags1':'格助詞',
                    'tags6':'と'
                },
                {
                    'tags0':'動詞',
                    'tags1':'自立',
                    'tags6':'思う'
                }
            ]
        },
        {
            'pattern':'かもしれない',
            'message':'断定を避ける表現です。断定系を使ってください。',
            'tokens':[
                {
                    'tags0':'助詞',
                    'tags1':'副助詞',
                    'tags6':'かも'
                },
                {
                    'tags0':'動詞',
                    'tags1':'自立',
                    'tags6':'しれる'
                },
                {
                    'tags0':'助動詞',
                    'tags1':'*',
                    'tags6':'ない'
                }
            ]
        },
        {
            'pattern':'ではないだろうか',
            'message':'断定を避ける表現です。断定系を使ってください。'
        },
        {
            'pattern':'でしょう',
            'message':'断定を避ける表現です。断定系を使ってください。'
        },
        {
            'pattern':'と感じる',
            'message':'断定を避ける表現です。断定系を使ってください。',
            'tokens':[
                {
                    'tags0':'助詞',
                    'tags1':'格助詞',
                    'tags6':'と'
                },
                {
                    'tags0':'動詞',
                    'tags1':'自立',
                    'tags6':'感じる'
                }
            ]
        }
    ];

    var validateRegex = function(sentence,terms){
        var regex = new RegExp( terms.pattern );
        if ( regex.test(sentence) ) {
            return 'error';
        }
    }

    var validateToken = function(sentence,terms){
        var result = 0;
        for (var i = 0; i < sentence.tokens.length; i++) {
            // 検査できる＝今のＴｏｋｅｎの位置＋検査すべきＴｏｋｅｎの数が検査すべきＴｏｋｅｎの長さよりも小さい
            if ( i + terms.tokens.length - 1 < sentence.tokens.length ){
                // 判定用変数を初期化
                result = 0
                for (var j = 0; j < terms.tokens.length; j++){
                    // 過剰検知は先行でresultを減らすことで対処
                    if (sentence.tokens[i+j].tags[6] === "わかる" && sentence.tokens[i+j+1].tags[0] === "形容詞"){ result--; }
                    if (sentence.tokens[i+j].tags[6] === "分かる" && sentence.tokens[i+j+1].tags[0] === "形容詞"){ result--; }

                    if (
                        sentence.tokens[i+j].tags[0] === terms.tokens[j].tags0 &&
                        sentence.tokens[i+j].tags[1] === terms.tokens[j].tags1 &&
                        sentence.tokens[i+j].tags[6] === terms.tokens[j].tags6
                    ){
                        result++;
                    }
                }
                if (result === terms.tokens.length){
                    return 'error';
                }
            }
        }
    }

    var error = ''
    for (var j = 0; j < terms.length; j++) {
        if ( !terms[j].hasOwnProperty('tokens') ){
            error = validateRegex(sentence,terms[j]);
        }

        if ( terms[j].hasOwnProperty('tokens') ){
            error = validateToken(sentence,terms[j]);
        }

        if ( error ){
            addError( '「' + terms[j].pattern + '」は' + terms[j].message, sentence);
        }
    }
}
