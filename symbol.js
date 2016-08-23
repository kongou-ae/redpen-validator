function validateSentence(sentence) {
    // 参考
    // https://www.jtf.jp/jp/style_guide/pdf/jtf_style_guide.pdf
    // 4.2. 記号
    // カタカナは「全角」で表記します。半角カタカナは特殊な用途を除いて、原則として使いません。
    var regex1 = new RegExp( /[()]/ );
    var regex2 = new RegExp( /[！!]/ );
    var regex3 = new RegExp( /[？?]/ );
    var regex4 = new RegExp( /[^ァ-ンヲｧ-ﾝｦ]・[^ァ-ンヲｧ-ﾝｦ]/ );
    var regex5 = new RegExp( /[-－]/ );
    var regex6 = new RegExp( /[：；:;]/ );
    var regex7 = new RegExp( /["”'’`‘｛｝{}＜＞]/ );
    var regexMail = new RegExp(/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/);
    var regexTimes = new RegExp(/([01]?[0-9]|2[0-3])[:：]([0-5][0-9])/);
    var regexTelNum = new RegExp(/\d{2,5}[-(]\d{1,4}[-)]\d{4}/)
    var tmp = ''
    var mailResult = ''

    // 1センテンス内に複数のミスがある場合を考慮して、gつきでマッチさせて、複数回エラーを出した方がいい気がする。
    // しかし、複数回ミスがある場合に一つだけ修正すると、残ったミスがエラーとして改めて検知される。
    // したがって、とりあえずこのままとする。使ってみて違和感があったらG方式に変更する
    if ( sentence.content.match(regex1) ) {
        addError('丸かっこは全角を使います。', sentence);
    }
    if ( sentence.content.match(regex2) ) {
        addError('感嘆符の利用は避けてください。', sentence);
    }
    if ( sentence.content.match(regex3) ) {
        addError('疑問符の利用は避けてください。', sentence);
    }
    if ( sentence.content.match(regex4) ) {
        addError('カタカナ複合語の区切り以外で「・」の利用は避けてください。', sentence);
    }

    // Sentenceからメールアドレスを除外する
    tmp = sentence.content
    while ( regexMail.test(tmp) === true ){
        tmp = tmp.replace(regexMail,'')
    }
    if ( tmp.match(regex5) ){
        if ( !tmp.match(regexTelNum)){
            addError('原則として「' + tmp.match(regex5) + '」の利用は避けてください。', sentence);
        }
    }

    // Sentenceから時刻を除外する
    tmp = sentence.content
    while ( regexTimes.test(tmp) === true ){
        tmp = tmp.replace(regexTimes,'')
    }
    if ( tmp.match(regex6) ) {
        addError('原則として「' + sentence.content.match(regex6) + '」の利用は避けてください。もし利用せざるを得ない場合は全角を使います。', sentence);
    }
    if ( sentence.content.match(regex7) ) {
        addError('「' + sentence.content.match(regex7) + '」の利用は避けてください。', sentence);
    }
}
