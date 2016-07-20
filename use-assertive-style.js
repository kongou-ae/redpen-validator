function validateSentence(sentence) {
    console = {
        log:print
    };
    var terms = [
        {
            'target':'考えられる',
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
            'target':'が分かる',
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
            'target':'がわかる',
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
        }
    ];

    var validate = function(sentence){
        for (var i = 0; i < sentence.tokens.length; i++) {
            for (var j = 0; j < terms.length; j++) {

                // 2文字のチェック
                if ( i + 1 < sentence.tokens.length ){
                    if (
                        sentence.tokens[i].tags[0] === terms[j].tokens[0].tags0 &&
                        sentence.tokens[i].tags[1] === terms[j].tokens[0].tags1 &&
                        sentence.tokens[i].tags[6] === terms[j].tokens[0].tags6 &&
                        sentence.tokens[i+1].tags[0] === terms[j].tokens[1].tags0 &&
                        sentence.tokens[i+1].tags[1] === terms[j].tokens[1].tags1 &&
                        sentence.tokens[i+1].tags[6] === terms[j].tokens[1].tags6
                    ){
                        return terms[j].target;
                    }
                }

                // 3文字のチェック
                if ( i + 2 < sentence.tokens.length ){
                    if (
                        sentence.tokens[i].tags[0] === terms[j].tokens[0].tags0 &&
                        sentence.tokens[i].tags[1] === terms[j].tokens[0].tags1 &&
                        sentence.tokens[i].tags[6] === terms[j].tokens[0].tags6 &&
                        sentence.tokens[i+1].tags[0] === terms[j].tokens[1].tags0 &&
                        sentence.tokens[i+1].tags[1] === terms[j].tokens[1].tags1 &&
                        sentence.tokens[i+1].tags[6] === terms[j].tokens[1].tags6 &&
                        sentence.tokens[i+2].tags[0] === terms[j].tokens[2].tags0 &&
                        sentence.tokens[i+2].tags[1] === terms[j].tokens[2].tags1 &&
                        sentence.tokens[i+2].tags[6] === terms[j].tokens[2].tags6
                    ){
                        return terms[j].target;
                    }
                }
            }
        }
    }

    var error = validate(sentence);
    if ( error ){
        addError( '「' + error + '」はあいまいな表現です。断定系で表現してください。' , sentence);
    }
}
