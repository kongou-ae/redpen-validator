function validateSentence(sentence) {

    var terms = [
        /* // sample
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
            'pattern':'ではないだろうか',
            'message':'断定を避ける表現です。断定系を使ってください。',
        }
        */
        {
            "patern": "上で",
            'message':'「上で」を「うえで」に修正してください。',
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "非自立",
                    "tags6": "上"
                },
                {
                    "tags0": "助詞",
                    "tags1": "格助詞",
                    "tags6": "で"
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
