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
        var count = 0;
        for (var i = 0; i < sentence.tokens.length; i++) {
            for (var j = 0; j < terms.length; j++) {
                // 検査できる＝今のＴｏｋｅｎの位置＋検査すべきＴｏｋｅｎの数が検査すべきＴｏｋｅｎの長さよりも小さい
                if ( i + terms[j].tokens.length - 1 < sentence.tokens.length ){
                    // 判定用変数を初期化
                    // 規則にマッチしているかを一つずつチェック
                    result = 0
                    for (var k = 0; k < terms[j].tokens.length; k++){
                        if (
                            sentence.tokens[i+k].tags[0] === terms[j].tokens[k].tags0 &&
                            sentence.tokens[i+k].tags[1] === terms[j].tokens[k].tags1 &&
                            sentence.tokens[i+k].tags[6] === terms[j].tokens[k].tags6
                        ){
                            result++;
                        }
                    }
                    // チェックした結果が規則の個数と一致したら、こそあどとみなす
                    if (result === terms[j].tokens.length){
                        count++;
                    }
                }
            }
        }
        return count
    }

    var count = ''
    count = validateToken(sentence,terms);

    if ( count >= 2 ){
        addError( "複数のこそあど言葉が使われています。", sentence);
    }
}
