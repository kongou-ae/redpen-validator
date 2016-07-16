function validateSentence(sentence) {
    // 参考
    // https://www.jtf.jp/jp/style_guide/pdf/jtf_style_guide.pdf
    // 2.2.2. 算用数字と漢数字の使い分け
    // 数量を表現し、数を数えられるものは算用数字を使用します。任意の数に置き換えても通用する語句がこれに該当します。序数詞（「第～回」「～番目」「～回目」）も算用数字を使います。
    var tmp = ''
    for (var k = 0; k < sentence.tokens.length; k++) {

        // --------------------------------------------------------------------------------------------
        // -漢数字にすべきなのに、算用数字になってしまうケースを除外する
        // --------------------------------------------------------------------------------------------
        // 3文字先までチェックして4文字熟語であれば、算用数字にしない(4個のTokenに分割されない4文字熟語は別途考える。。)

        if ( k + 3 < sentence.tokens.length ) {
            if (
                sentence.tokens[k].tags[6].match(/[一二三四五六七八九十百千]/) &&
                sentence.tokens[k+1].tags[6].match(/[\u4E00-\u9FFF]/) &&
                sentence.tokens[k+2].tags[6].match(/[一二三四五六七八九十百千]/) &&
                sentence.tokens[k+3].tags[6].match(/[\u4E00-\u9FFF]/)
            ) return null;
        }

        // 4文字にTokenされす3文字にTokenされる四文字熟語を算用数字にしない
        if ( k + 2 < sentence.tokens.length ) {
            tmp = sentence.tokens[k].surface + sentence.tokens[k+1].surface + sentence.tokens[k+2].surface;
            if ( tmp.match(/[一二三四五六七八九十百千][\u4E00-\u9FFF][一二三四五六七八九十百千][\u4E00-\u9FFF]/) ) return null;
        }

        // 4文字にTokenされす2文字にTokenされる四文字熟語を算用数字にしない
        if ( k + 1 < sentence.tokens.length ){
            tmp = sentence.tokens[k].surface + sentence.tokens[k+1].surface;
            if ( tmp.match(/[一二三四五六七八九十百千][\u4E00-\u9FFF][一二三四五六七八九十百千][\u4E00-\u9FFF]/) ) return null;
        }

        // 数[漢数字]が数[算用数字]になってしまうので除外
        if ( k + 1 < sentence.tokens.length ){
            if (
                sentence.tokens[k].tags[6] === '数' &&
                sentence.tokens[k+1].tags[6].match(/[十百千万]/)
            ) return null;
        }

        // [漢数字]次[名詞]
        if (k + 2 < sentence.tokens.length){
            if (
                sentence.tokens[k].tags[6].match(new RegExp(/[一二三四五六七八九十百千]/)) &&
                sentence.tokens[k+1].tags[6] === '次' &&
                sentence.tokens[k+2].tags[0] === '名詞'
            ) return null;
        }

        if( k + 1 < sentence.tokens.length ){
            if (
                sentence.tokens[k].surface === '五' &&
                sentence.tokens[k+1].tags[6] ==='大陸'
            ) return null;
        }

        // --------------------------------------------------------------------------------------------
        // 最後の処理で算用数字にすべきなのに、ならないケースを個別にエラー処理
        // --------------------------------------------------------------------------------------------
        // 漢数字を含む言葉が一つの単語としてtokenizeされてしまうになってしまうケース
        if ( sentence.tokens[k].tags[6].match(/十進法|二進法|十六進法/) ) return addError('数を数えられるものは算用数字を利用します' , sentence );

        // 三つが「三つ」という一般名詞でtokenizeされてしまうので、個別に定義
        if (
             sentence.tokens[k].tags[0] === "名詞" &&
             sentence.tokens[k].tags[1] === "一般" &&
             sentence.tokens[k].tags[6].match(new RegExp(/[一二三四五六七八九]つ/))
        ){
            addError('数を数えられるものは算用数字を利用します' , sentence );
        }

        // --------------------------------------------------------------------------------------------
        // 問答無用で算用数字にする処理
        // --------------------------------------------------------------------------------------------
        // 上記に合致せず、名詞で数のものがあれば、
        if (
             sentence.tokens[k].tags[0] === "名詞" &&
             sentence.tokens[k].tags[1] === "数" &&
             sentence.tokens[k].tags[6].match(new RegExp(/[一二三四五六七八九十百千]/))
        ){
            addError('数を数えられるものは算用数字を利用します' , sentence );
        }

        // --------------------------------------------------------------------------------------------
        // 漢数字にすべきケースに対してエラー処理
        // --------------------------------------------------------------------------------------------
        // [漢数字]大陸 算用数字の場合は、漢数字にするよう促す
        if ( k + 1 < sentence.tokens.length ){
            if (
                sentence.tokens[k].surface === '5' &&
                sentence.tokens[k+1].tags[6] ==='大陸'
            ) addError('慣用的表現、熟語、概数、固有名詞、副詞など、漢数字を使用することが一般的な語句では漢数字を使います。' , sentence );
        }

        // [算用数字]次[名詞]
        if (  k + 2 < sentence.tokens.length ){
            if (
                sentence.tokens[k].surface.match(new RegExp(/[1-9]/)) &&
                sentence.tokens[k+1].tags[6] === '次' &&
                sentence.tokens[k+2].tags[0] === '名詞'
            ) addError('慣用的表現、熟語、概数、固有名詞、副詞など、漢数字を使用することが一般的な語句では漢数字を使います。' , sentence );
        }

        // [算用数字]時的
        if ( k + 2 < sentence.tokens.length ){
            if (
                sentence.tokens[k].surface.match(new RegExp(/[1-9]/)) &&
                sentence.tokens[k+1].tags[6] === '時' &&
                sentence.tokens[k+2].tags[6] === '的'
            ) addError('慣用的表現、熟語、概数、固有名詞、副詞など、漢数字を使用することが一般的な語句では漢数字を使います。' , sentence );
        }
    }
}
