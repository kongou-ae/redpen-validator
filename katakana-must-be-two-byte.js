function validateSentence(sentence) {
    // 参考
    // https://www.jtf.jp/jp/style_guide/pdf/jtf_style_guide.pdf
    // 2.1.5. カタカナ
    // カタカナは「全角」で表記します。半角カタカナは特殊な用途を除いて、原則として使いません。
    var terms = [
        {
            'expected':'[ァ-ンヲ]',
            'pattern':['[ｧ-ﾝｦ]']
        }
    ];

    var regex = new RegExp( terms[0]['pattern'], 'g');
    // 形態素解析するかどうか
    if ( sentence.content.match(regex) ) {
        addError('半角のカタカナが含まれています。全角に修正してください', sentence);
    }
}
