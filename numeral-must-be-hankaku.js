function validateSentence(sentence) {
    // 参考
    // https://www.jtf.jp/jp/style_guide/pdf/jtf_style_guide.pdf
    // 2.1.8. 算用数字の実装
    // 算用数字は「半角」で表記します。用途によっては全角を許容します。ただし、表記をできるだけ統一するため、特別な理由がない限り半角での表記を原則とします。

    var terms = [
        {
            'expected':'[0123456789]',
            'pattern':['[０１２３４５６７８９]']
        }
    ];

    var regex = new RegExp( terms[0]['pattern'], 'g');
    // 形態素解析するかどうか
    if ( sentence.content.match(regex) ) {
        addError('全角の算用数字が含まれています。半角に修正してください', sentence);
    }
}
