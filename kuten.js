// パラグラフに含まれるすべての文章を取得する方法がわからないので、皇族処理で利用する、すべてのセンテンスを連結するtmpListParagraphを作っている
// http://redpen.cc/javadoc/latest/cc/redpen/model/Paragraph.html
function validateSection(section){

    var regex1 = new RegExp( /.。$/ );
    var regex2 = new RegExp( /.。」/ );
    var regex3 = new RegExp( /.。\）/ );
    var regex4 = new RegExp( /\)$/ );

    // 見出しをチェックする
    if (section.getHeaderContents() ){
        for (var i = 0; i < section.getHeaderContents().length; i++){
            if ( regex1.test(section.getHeaderContent(i).content) == true && section.getHeaderContent(i).content != ''){
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
                for(var k = 0; k < section.getListBlock(i).getListElement(j).getSentences().length; k++){
                    var tmpListParagraph = tmpListParagraph + section.getListBlock(i).getListElement(j).getSentence(k).content
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
                    if (secondFromLastToken.tags[0] == "名詞" && lastToken.surface == "。"){
                        section.getListBlock(i).getListElement(j).getSentence(k-1).setContent(tmpListParagraph)
                        var errParagraph = section.getListBlock(i).getListElement(j).getSentence(k-1)
                        addError('箇条書きの体言止めには「。」をつけません', errParagraph);
                    }　else if (lastToken.tags[0] != "名詞"){
                        section.getListBlock(i).getListElement(j).getSentence(k-1).setContent(tmpListParagraph)
                        var errParagraph = section.getListBlock(i).getListElement(j).getSentence(k-1)
                        addError('箇条書きの最後には「。」をつけます', errParagraph);
                    }
                }
            }
        }
    }

    // 本文はかならず。で終わっていることをチェック
    for (var i = 0; i < section.getParagraphs().length; i++){
        var tmpParagraph = ''
        for (var j = 0; j < section.getParagraph(i).getSentences().length; j++){
            tmpParagraph = tmpParagraph + section.getParagraph(i).getSentence(j).content
        }

        // sentenceオブジェクトを宣言する方法がわからないので、強引に既存のオブジェクトを転用する
        var errParagraph = section.getParagraph(i).appendSentence(tmpParagraph,0)
        errParagraph = errParagraph.getSentences()[errParagraph.getSentences().length - 1]

        if ( regex1.test(tmpParagraph) == false && regex4.test(tmpParagraph) == false){
            addError('文末には「。」をつけます', errParagraph);
        }
        if ( regex2.test(tmpParagraph) == true ){
            addError('閉じかっこの前に「。」はつけません。', errParagraph);
        }
        if ( regex3.test(tmpParagraph) == true ){
            addError('丸かっこの前に「。」はつけません。', errParagraph);
        }
    }
}
