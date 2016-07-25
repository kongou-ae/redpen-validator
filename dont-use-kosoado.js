function validateSentence(sentence) {
    // 参考
    // http://jubilee-web.jp/blog/archives/96

    var terms = [
        {
            "pattern": "これ",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "これ"
                }
            ]
        },
        {
            "pattern": "それ",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "それ"
                }
            ]
        },
        {
            "pattern": "あれ",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "あれ"
                }
            ]
        },
        {
            "pattern": "どれ",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "どれ"
                }
            ]
        },
        {
            "pattern": "この",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "連体詞",
                    "tags1": "*",
                    "tags6": "この"
                }
            ]
        },
        {
            "pattern": "その",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "連体詞",
                    "tags1": "*",
                    "tags6": "その"
                }
            ]
        },
        {
            "pattern": "あの",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "連体詞",
                    "tags1": "*",
                    "tags6": "あの"
                }
            ]
        },
        {
            "pattern": "どの",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "連体詞",
                    "tags1": "*",
                    "tags6": "どの"
                }
            ]
        },
        {
            "pattern": "ここ",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "ここ"
                }
            ]
        },
        {
            "pattern": "そこ",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "そこ"
                }
            ]
        },
        {
            "pattern": "あそこ",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "あそこ"
                }
            ]
        },
        {
            "pattern": "どこ",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "どこ"
                }
            ]
        },
        {
            "pattern": "こちら",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "こちら"
                }
            ]
        },
        {
            "pattern": "そちら",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "そちら"
                }
            ]
        },
        {
            "pattern": "あちら",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "あちら"
                }
            ]
        },
        {
            "pattern": "どちら",
            "message": "指示語です。指示語を使うと文章が分かりにくくなります。具体的な表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "どちら"
                }
            ]
        }
    ];

    var validateToken = function(sentence,terms){

        var result = 0;
        for (var i = 0; i < sentence.tokens.length; i++) {
            // 検査できる＝今のＴｏｋｅｎの位置＋検査すべきＴｏｋｅｎの数が検査すべきＴｏｋｅｎの長さよりも小さい
            if ( i + terms.tokens.length - 1 < sentence.tokens.length ){
                // 判定用変数を初期化
                for (var j = 0; j < terms.tokens.length; j++){
                    if (
                        sentence.tokens[i+j].tags[0] === terms.tokens[j].tags0 &&
                        sentence.tokens[i+j].tags[1] === terms.tokens[j].tags1 &&
                        sentence.tokens[i+j].tags[6] === terms.tokens[j].tags6
                    ){
                        result++;
                    }
                }
            }
        }
        if (result === terms.tokens.length){
            return 'error';
        }
    }

    var error = ''
    for (var j = 0; j < terms.length; j++) {

        if ( terms[j].hasOwnProperty('tokens') ){
            error = validateToken(sentence,terms[j]);
        }

        if ( error ){
            addError( '「' + terms[j].pattern + '」は' + terms[j].message, sentence);
        }
    }
}
