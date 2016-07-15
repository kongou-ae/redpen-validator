function validateSentence(sentence) {
    // 参考
    // https://www.jtf.jp/jp/style_guide/pdf/jtf_style_guide.pdf
    // 2.2.1. ひらがなと漢字の使い分け
    // 漢字は「全角」で表記します。漢字の使用は、平成 22 年 11 月 30 日内閣告示第 2 号の「常用漢字表」に原則として準じます。

    var terms = [
        {
            'expected':'あらかじめ',
            'pattern':['予め']
        },
        {   'expected':'いずれ',
            'pattern':['何れ']
        },
        {
            'expected':'いつ',
            'pattern':['何時'],
            'tokenCheck':['名詞','代名詞','何時']
        },
        {   'expected':'おおよそ',
            'pattern':['凡そ']
        },
        {   'expected':'かえって',
            'pattern':['却って'],
            'tokenCheck':['副詞','一般','却って']
        },
        {   'expected':'かつ',
            'pattern':['且つ']
        },
        {   'expected':'かも知れない',
            'pattern':['かもしれない']
        },
        {
            'expected':'ください',
            'pattern':['下さい'],
            'tokenCheck':['動詞','非自立','下さる']
        },
        {   'expected':'これほど',
            'pattern':['これ程']
        },
        {   'expected':'ご',
            'pattern':['御'],
            'tokenCheck':['接頭詞','名詞接続','御']
        },
        {   'expected':'子ども',
            'pattern':['こども','子供']
        },
        {
            'expected':'さらに',
            'pattern':['更に'],
            'tokenCheck':['副詞','助詞類接続','更に']
        },
        {
            'expected':'しかし',
            'pattern':['然し']
        },
        {
            'expected':'しばらく',
            'pattern':['暫く']
        },
        {
            'expected':'すなわち',
            'pattern':['即ち']
        },
        /* スタイルガイドにはあるが、実際に使うことはないと思うので削除
        {
            'expected':'すべき',
            'pattern':['可き'],
        },
        */
        {
            'expected':'せっかく',
            'pattern':['折角']
        },
        {
            'expected':'たびたび',
            'pattern':['度々']
        },
        {
            'expected':'ただし',
            'pattern':['但し'],
            'tokenCheck':['接続詞','*','但し']
        },
        {
            'expected':'たち',
            'pattern':['達'],
            'tokenCheck':['名詞','接尾','達']
        },
        {
            'expected':'できる',
            'pattern':['出来る'],
            'tokenCheck':['動詞','自立','出来る']
        },
        {
            'expected':'どこ',
            'pattern':['何処']
        },
        {
            'expected':'ないし',
            'pattern':['乃至']
        },
        {
            'expected':'なお',
            'pattern':['尚'],
            'tokenCheck':['接続詞','*','尚']
        },
        {
            'expected':'なかなか', //少々精度に不安あり
            'pattern':['中々']
        },
        /*いい感じの形態素解析が思いつかないのでパス
        {
            'expected':'ほど',
            'pattern':['程'],
        },
        */
        {
            'expected':'または',
            'pattern':['又は'],
            'tokenCheck':['接続詞','*','又は']
        },
        {
            'expected':'むしろ',
            'pattern':['寧ろ']
        },
        {
            'expected':'めったに',
            'pattern':['滅多に']
        },
        {
            'expected':'もはや',
            'pattern':['最早']
        },
        {
            'expected':'もしくは',
            'pattern':['若しくは']
        },
        {
            'expected':'もって',
            'pattern':['以て','以って']
        },
        {
            'expected':'ように',
            'pattern':['様に'],
            'tokenCheck':['名詞','非自立','^様$']
        },
        {
            'expected':'よほど',
            'pattern':['余程']
        },
        // JTF-2.2.1 漢字で書く
        {
            'expected':'一切',
            'pattern':['いっさい']
        },
        {
            'expected':'必ず',
            'pattern':['かならず']
        },
        {
            'expected':'大いに',
            'pattern':['おおいに']
        },
        {
            'expected':'強いて',
            'pattern':['しいて'],
            'tokenCheck':['動詞','自立','しいる']
        },
        /* いい感じの検知方法が見当たらないのでパス
        {
            'expected':'中',
            'pattern':['じゅう'],
        },
        */
        {
            'expected':'時々',
            'pattern':['ときどき'],
            'tokenCheck':['副詞','一般','ときどき']
        },
        {
            'expected':'何しろ',
            'pattern':['なにしろ'],
            'tokenCheck':['副詞','一般','なにしろ']
        },
        /* いい感じの検知方法が見当たらないのでパス
        {
            'expected':'何しろ',
            'pattern':['なにしろ'],
            'tokenCheck':['副詞','一般','なにしろ'],
        },
        */
        {
            'expected':'何らかの',
            'pattern':['なんらかの'],
            'tokenCheck':['連体詞','*','なんらかの']
        },
        {
            'expected':'何とも',
            'pattern':['なんとも'],
            'tokenCheck':['副詞','一般','なんとも']
        },
        // JTF-2.2.1 漢字を使い分ける
        {
            'expected':'箇所',
            'pattern':['個所']
        },
        {
            'expected':'箇条書き',
            'pattern':['個条書き']
        },
        /* いい感じの検知方法が見当たらないのでパス
        {
            'expected':'付属する',
            'pattern':['附属する'],
        },
        */
        {
            'expected':'摩耗',
            'pattern':['磨耗']
        },
        {
            'expected':'摩滅',
            'pattern':['磨滅']
        },
        // JTF=2.2.1  品詞・意味で使い分ける
        {
            'expected':'および',
            'pattern':['及び'],
            'tokenCheck':['接続詞','*','及び']
        },
        {
            'expected':'及ぶ',
            'pattern':['およぶ'],
            'tokenCheck':['動詞','自立','およぶ']
        },
        {
            'expected':'いたします',
            'pattern':['致します'],
            'tokenCheck':['動詞','非自立','致す']
        },
        {
            'expected':'致す',
            'pattern':['いたす'],
            'tokenCheck':['動詞','自立','致す']
        },
        {
            'expected':'したがって',
            'pattern':['従って'],
            'tokenCheck':['接続詞','*','従って']
        },
        {
            'expected':'従う',
            'pattern':['したがう'],
            'tokenCheck':['動詞','自立','したがう']
        },
        /* これは形態素解析でも無理だと思う。。。
        {
            'expected':'出す',
            'pattern':['だす'],
        },
        {
            'expected':'だす',
            'pattern':['出す'],
        },
        {
            'expected':'付く',
            'pattern':['つく'],
        },
        {
            'expected':'付く',
            'pattern':['つく'],
        },
        */
        {
            'expected':'つき',
            'pattern':['付き'],
            'tokenCheck':['名詞','接尾','付き'] //手付きや目付きは一つの名詞になってしまうので検知できない。。。
            // 好み
        },
        {
            'expected':'とおり',
            'pattern':['通り'],
            'tokenCheck':['名詞','非自立','通り'] //「以下の通り」の通りは「名詞・一般」になってしまう。これを対象にしてしまうと、道路を意味する「通り」が平仮名になってしまう。。。
        },
        {
            'expected':'通り',
            'pattern':['とおり'],
            'tokenCheck':['名詞','接尾','とおり']
        },
        {
            'expected':'ほしい',
            'pattern':['欲しい'],
            'tokenCheck':['形容詞','非自立','欲しい']
        },
        {
            'expected':'欲しい',
            'pattern':['ほしい'],
            'tokenCheck':['形容詞','自立','ほしい']
        },
        // JTF=2.2.1  複数の表記方法が一般的で、実務文書で頻出する語
        {
            'expected':'あまりに',
            'pattern':['余りに']
        },
        {
            'expected':'うえで',
            'pattern':['上で'],
            'tokenCheck':['名詞','非自立','^上$']
        },
        {
            'expected':'きわめて',
            'pattern':['極めて']
        },
        {
            'expected':'さまざま',
            'pattern':['様々']
        },
        {
            'expected':'すでに',
            'pattern':['既に']
        },
        {
            'expected':'すべて',
            'pattern':['全て']
        },
        {
            'expected':'ともに',
            'pattern':['共に'],
            'tokenCheck':['副詞','一般','^共に$']
        },
        {
            'expected':'たとえば',
            'pattern':['例えば']
        },
        {
            'expected':'ただちに',
            'pattern':['直ちに']
        },
        {
            'expected':'とうてい',
            'pattern':['到底']
        },
        {
            'expected':'はたして',
            'pattern':['果たして']
        },
        {
            'expected':'ひときわ',
            'pattern':['一際']
        },
        /* kuromojiのテストツールが、「一度」を「ひとたび」と認識しないので対応できない
        {
            'expected':'ひとたび',
            'pattern':['一度'],
        },
        */
        {
            'expected':'ほか',
            'pattern':['他'],
            'tokenCheck':['名詞','一般','^他$'] // 他を探す
        },
        {
            'expected':'ほか',
            'pattern':['他'],
            'tokenCheck':['名詞','非自立','^他$'] // この他に必要なもの
        },
        {
            'expected':'ほか',
            'pattern':['外'],
            'tokenCheck':['名詞','副詞可能','^外$'] // 思いの外
        },
        {
            'expected':'ほかならぬ',
            'pattern':['他ならぬ','外ならぬ']
        },
        {
            'expected':'まったく',
            'pattern':['全く']
        },
        {
            'expected':'もともと',
            'pattern':['元々']
        },
        {
            'expected':'わかる',
            'pattern':['分かる'],
            'tokenCheck':['動詞','自立','分かる']
        },
        {
            'expected':'わかる',
            'pattern':['解る'],
            'tokenCheck':['動詞','自立','解る']
        },
        {
            'expected':'わかる',
            'pattern':['判る'],
            'tokenCheck':['動詞','自立','判る']
        },
        {
            'expected':'ひとつひとつ',
            'pattern':['一つ一つ']
        },
        {
            'expected':'わたし',
            'pattern':['私'],
            'tokenCheck':['名詞','代名詞','^私$']
        },
        {
            'expected':'われわれ',
            'pattern':['我々'],
            'tokenCheck':['名詞','代名詞','我々']
        },
        // 過剰検知しそう。適宜形態素解析に切り替える
        {
            'expected':'わが',
            'pattern':['我が']
        },
    ];

    var tokenCheck = function (sentence){
        for (var k = 0; k < sentence.tokens.length; k++) {
            // 2.2.1
            if ( sentence.tokens[k].tags[0] === terms[i]['tokenCheck'][0] &&
                 sentence.tokens[k].tags[1] === terms[i]['tokenCheck'][1] && 
                 sentence.tokens[k].tags[6].match(new RegExp(terms[i]['tokenCheck'][2])) ){
                addError(' 「' + sentence.tokens[k].surface + '」を「' + terms[i]['expected'] + '」に修正してください' , sentence);
            }
        }
    }

    for ( var i = 0; i < terms.length; i++ ) {
        for ( var j = 0; j < terms[i]['pattern'].length; j++ ) {
            var regex = new RegExp( terms[i]['pattern'][j]);
            // 形態素解析するかどうか
            if ( 'tokenCheck' in terms[i] ) {
                tokenCheck(sentence);
            } else {
                if ( sentence.content.match(regex) ) {
                    addError('「' + terms[i]['pattern'][j] + '」を「' + terms[i]['expected'] + '」に修正してください', sentence);
                }
            }
        }
    }
}
