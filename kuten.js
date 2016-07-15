// パラグラフに含まれるすべての文章を取得する方法がわからないので、後続処理で利用する、すべてのセンテンスを連結するtmpListParagraphを作っている
// http://redpen.cc/javadoc/latest/cc/redpen/model/Paragraph.html
function validateSection(section){

    var regex1 = new RegExp( /.。$/ );
    var regex2 = new RegExp( /.。」/ );
    var regex3 = new RegExp( /.。\）/ );
    var regex4 = new RegExp( /\)$/ );

    // 見出しをチェックする
    if (section.getHeaderContents() ){
        for (var i = 0; i < section.getHeaderContents().length; i++){
            if ( regex1.test(section.getHeaderContent(i).content) === true && section.getHeaderContent(i).content !== ''){
                addError('見出しに「。」はつけません。', section.getHeaderContent(i));
            }
        }
    }

    // リストをチェックする
    if (section.getListBlocks()){
        for(var i = 0; i < section.getListBlocks().length; i++){
            for(var j = 0; j < section.getListBlock(i).getListElements().length; j++){
                // 箇条書きの一つ表すパラグラフを作成する。エラーの時に使う
                var tmpListParagraph = ''
                var tmpLineNumber = ''
                for(var k = 0; k < section.getListBlock(i).getListElement(j).getSentences().length; k++){
                    tmpListParagraph = tmpListParagraph + section.getListBlock(i).getListElement(j).getSentence(k).content
                    tmpLineNumber = section.getListBlock(i).getListElement(j).getSentence(k).lineNumber
                }

                // カウンターKは回りきってしまって１多いので、１引く。tokensの長さが０の場合は。がついていないので除外する
                var lastToken = section.getListBlock(i).getListElement(j).getSentence(k-1).tokens[section.getListBlock(i).getListElement(j).getSentence(k-1).tokens.length -1]

                if (section.getListBlock(i).getListElement(j).getSentence(k-1).tokens.length > 1){
                    var secondFromLastToken = section.getListBlock(i).getListElement(j).getSentence(k-1).tokens[section.getListBlock(i).getListElement(j).getSentence(k-1).tokens.length - 2]
                }

                // ここ、もう少しなんとかならんのか？
                // 1文字でなければ
                if (section.getListBlock(i).getListElement(j).getSentence(k-1).tokens.length > 1){
                    // 名詞または体言止めで、末尾に。がついてしまっている
                    if (secondFromLastToken.tags[0] === "名詞" && lastToken.surface == "。"){
                        addError('箇条書きの体言止めには「。」をつけません', section.getListBlock(i).getListElement(j).getSentence(k-1));
                    }　else if (lastToken.tags[0] !== "名詞"){
                        addError('箇条書きの最後には「。」をつけます', section.getListBlock(i).getListElement(j).getSentence(k-1));
                    }
                }
            }
        }
    }

    // 本文はかならず。で終わっていることをチェック
    for (var i = 0; i < section.getParagraphs().length; i++){
        var tmpParagraph = ''
        var tmpLineNumber = ''
        for (var j = 0; j < section.getParagraph(i).getSentences().length; j++){
            tmpParagraph = tmpParagraph + section.getParagraph(i).getSentence(j).content
            tmpLineNumber = section.getParagraph(i).getSentence(j).lineNumber
        }

        if ( regex1.test(tmpParagraph) === false && regex4.test(tmpParagraph) === false){
            addError('文末には「。」をつけます', section.getParagraph(i).getSentence(j-1));
        }
        if ( regex2.test(tmpParagraph) === true ){
            addError('閉じかっこの前に「。」はつけません。', section.getParagraph(i).getSentence(j-1));
        }
        if ( regex3.test(tmpParagraph) === true ){
            addError('丸かっこの前に「。」はつけません。', section.getParagraph(i).getSentence(j-1));
        }
    }
}
