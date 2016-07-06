function validateSection(section){

    console = {
        log:print,
    };

    var regex1 = new RegExp( /.。$/ );
    var regex2 = new RegExp( /.。」/ );
    var regex3 = new RegExp( /.。\）/ );
    var regex4 = new RegExp( /\)$/ );

    // 見出しの後ろに。がついていないことをチェック
    if (section.getHeaderContents() ){
        for (var i = 0; i < section.getHeaderContents().length; i++){
            if ( regex1.test(section.getHeaderContent(i).content) == true && section.getHeaderContent(i).content != ''){
                addError('見出しに「。」はつけません。', section.getHeaderContent(i));
            }
        }
    }

    // リストをチェック
    if (section.getListBlocks()){
        for(var i = 0; i < section.getListBlocks().length; i++){
            for(var j = 0; j < section.getListBlock(i).getListElements().length; j++){
                var tmpListParagraph = ''
                // 箇条書き全体を表すパラグラフを作成する。エラーの時に使う
                for(var k = 0; k < section.getListBlock(i).getListElement(j).getSentences().length; k++){
                    var tmpListParagraph = tmpListParagraph + section.getListBlock(i).getListElement(j).getSentence(k).content
                }

                // sentenceを宣言することができないので、チェックが終わったsentenceを使いまわして、エラー用のセンテンスを作成
                // リストに含まれる最終センテンスに「。」がついていなかを確認する
                // リストに含まれる最終センテンスが「体言止め＋。」になっていないかをチェックする
                // カウンターKは回りきってしまって１多いので、１引く。tokensの長さが０の場合は。がついていないので除外する
                var lastToken = section.getListBlock(i).getListElement(j).getSentence(k-1).tokens[section.getListBlock(i).getListElement(j).getSentence(k-1).tokens.length -1]

                if (section.getListBlock(i).getListElement(j).getSentence(k-1).tokens.length > 1){
                    var secondFromLastToken = section.getListBlock(i).getListElement(j).getSentence(k-1).tokens[section.getListBlock(i).getListElement(j).getSentence(k-1).tokens.length - 2]
                }

                // ここ、もう少しなんとかならんのか？
                if (section.getListBlock(i).getListElement(j).getSentence(k-1).tokens.length > 1){
                    if (secondFromLastToken.tags[0] == "名詞" && lastToken.surface == "。"){
                        section.getListBlock(i).getListElement(j).getSentence(k-1).setContent(tmpListParagraph)
                        var errParagraph = section.getListBlock(i).getListElement(j).getSentence(k-1)
                        addError('箇条書きの体言止めに「。」はつけません', errParagraph);
                    }
                } else {
                    if (lastToken.tags[0] != "名詞"){
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

            // １つの文
            // console.log(section.getParagraph(i).getSentence(j).content)
            // パラグラフに含まれるすべての文章を取得する方法がわからないので、皇族処理で利用する、すべてのセンテンスを連結するParagraphを作る。
            // http://redpen.cc/javadoc/latest/cc/redpen/model/Paragraph.html
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
