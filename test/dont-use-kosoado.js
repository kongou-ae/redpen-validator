function validateSentence(sentence) {
    // 参考
    // http://jubilee-web.jp/blog/archives/96
    console = {
        log:print
    };
    var terms = [
        {
            "pattern": "これ",
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
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
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
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
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
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
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
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
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
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
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
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
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
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
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
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
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
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
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "そこ"
                },
            ]
        },
        {
            "pattern": "あそこ",
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "あそこ"
                },
            ]
        },
        {
            "pattern": "どこ",
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "どこ"
                },
            ]
        },
        {
            "pattern": "こちら",
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "こちら"
                },
            ]
        },
        {
            "pattern": "そちら",
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "そちら"
                },
            ]
        },
        {
            "pattern": "あちら",
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
            "tokens": [
                {
                    "tags0": "名詞",
                    "tags1": "代名詞",
                    "tags6": "あちら"
                },
            ]
        },
        {
            "pattern": "どちら",
            "message": "何を指しているのかが不明確です。別の表現を検討してください。",
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
        // 初めのセンテンスに「こそあど」があったらエラー。位置は問わない。
        if ( sentence.isFirstSentence() === true ) {
            for (var i = 0; i < sentence.tokens.length; i++) {
                if (
                    sentence.tokens[i].tags[0] === terms.tokens[0].tags0 &&
                    sentence.tokens[i].tags[1] === terms.tokens[0].tags1 &&
                    sentence.tokens[i].tags[6] === terms.tokens[0].tags6
                ) {
                    return 'error';
                }
            }
        }

        // 2番目以降のセンテンスの先頭以外に「こそあど」があったらエラー。
        if ( sentence.isFirstSentence() === false ) {
            for (var i = 0; i < sentence.tokens.length; i++) {
                if (
                    sentence.tokens[i].offset !== 0 &&
                    sentence.tokens[i].tags[0] === terms.tokens[0].tags0 &&
                    sentence.tokens[i].tags[1] === terms.tokens[0].tags1 &&
                    sentence.tokens[i].tags[6] === terms.tokens[0].tags6
                ) {
                    return 'error';
                }
            }
        }
    };

    var error = ''
    // 文章の一番初めのセンテンスでなければ
    for (var j = 0; j < terms.length; j++) {
        if ( terms[j].hasOwnProperty('tokens') ){
            error = validateToken(sentence,terms[j]);
        }

        if ( error ){
            addError( '「' + terms[j].pattern + '」は' + terms[j].message, sentence);
        }
    }
}
