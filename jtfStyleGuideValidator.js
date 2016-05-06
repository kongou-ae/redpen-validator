function validateSentence(sentence) {
    //　使い方はREADMEを参照ください。
    // https://github.com/kongou-ae/redpen-validator/blob/master/README.md
    /*
    console = {
        log:print
    };
    */
    var terms = [
        // JTF-2.2.1 ひらがなで書く
        {
            'expected':'あらかじめ',
            'pattern':['予め'],
            'source':'JTF-2.2.1'
        },
        {   'expected':'いずれ',
            'pattern':['何れ'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'いつ',
            'pattern':['何時'],
            'tokenCheck':['名詞','代名詞','何時'],
            'source':'JTF-2.2.1'
        },
        {   'expected':'おおよそ',
            'pattern':['凡そ'],
            'source':'JTF-2.2.1'
        },
        {   'expected':'かえって',
            'pattern':['却って'],
            'tokenCheck':['副詞','一般','却って'],
            'source':'JTF-2.2.1'
        },
        {   'expected':'かつ',
            'pattern':['且つ'],
            'source':'JTF-2.2.1'
        },
        {   'expected':'かも知れない',
            'pattern':['かもしれない'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ください',　
            'pattern':['下さい'],
            'tokenCheck':['動詞','非自立','下さる'],
            'source':'JTF-2.2.1'
        },
        {   'expected':'これほど',
            'pattern':['これ程'],
            'source':'JTF-2.2.1'
        },
        {   'expected':'ご',
            'pattern':['御'],
            'tokenCheck':['接頭詞','名詞接続','御'],
            'source':'JTF-2.2.1'
        },
        {   'expected':'子供',
            'pattern':['こども','子供'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'さらに',
            'pattern':['更に'],
            'tokenCheck':['副詞','助詞類接続','更に'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'しかし',
            'pattern':['然し'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'しばらく',
            'pattern':['暫く'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'すなわち',
            'pattern':['即ち'],
            'source':'JTF-2.2.1'
        },
        /* スタイルガイドにはあるが、実際に使うことはないと思うので削除
        {
            'expected':'すべき',
            'pattern':['可き'],
            'source':'JTF-2.2.1'
        },
        */
        {
            'expected':'せっかく',
            'pattern':['折角'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'たびたび',
            'pattern':['度々'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ただし',
            'pattern':['但し'],
            'tokenCheck':['接続詞','*','但し'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'たち',
            'pattern':['達'],
            'tokenCheck':['名詞','接尾','達'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'できる',
            'pattern':['出来る'],
            'tokenCheck':['動詞','自立','出来る'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'どこ',
            'pattern':['何処'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ないし',
            'pattern':['乃至'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'なお',
            'pattern':['尚'],
            'tokenCheck':['接続詞','*','尚'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'なかなか',　//少々精度に不安あり
            'pattern':['中々'],
            'source':'JTF-2.2.1'
        },
        /*いい感じの形態素解析が思いつかないのでパス
        {
            'expected':'ほど',
            'pattern':['程'],
            'source':'JTF-2.2.1'
        },
        */
        {
            'expected':'または',
            'pattern':['又は'],
            'tokenCheck':['接続詞','*','又は'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'むしろ',
            'pattern':['寧ろ'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'めったに',
            'pattern':['滅多に'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'もはや',
            'pattern':['最早'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'もしくは',
            'pattern':['若しくは'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'もって',
            'pattern':['以て','以って'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ように',
            'pattern':['様に'],
            'tokenCheck':['名詞','非自立','^様$'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'よほど',
            'pattern':['余程'],
            'source':'JTF-2.2.1'
        },
        // JTF-2.2.1 漢字で書く
        {
            'expected':'一切',
            'pattern':['いっさい'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'必ず',
            'pattern':['かならず'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'大いに',
            'pattern':['おおいに'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'強いて',
            'pattern':['しいて'],
            'tokenCheck':['動詞','自立','しいる'],
            'source':'JTF-2.2.1'
        },
        /* いい感じの検知方法が見当たらないのでパス
        {
            'expected':'中',
            'pattern':['じゅう'],
            'source':'JTF-2.2.1'
        },
        */
        {
            'expected':'時々',
            'pattern':['ときどき'],
            'tokenCheck':['副詞','一般','ときどき'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'何しろ',
            'pattern':['なにしろ'],
            'tokenCheck':['副詞','一般','なにしろ'],
            'source':'JTF-2.2.1'
        },
        /* いい感じの検知方法が見当たらないのでパス
        {
            'expected':'何しろ',
            'pattern':['なにしろ'],
            'tokenCheck':['副詞','一般','なにしろ'],
            'source':'JTF-2.2.1'
        },
        */
        {
            'expected':'何らかの',
            'pattern':['なんらかの'],
            'tokenCheck':['連体詞','*','なんらかの'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'何とも',
            'pattern':['なんとも'],
            'tokenCheck':['副詞','一般','なんとも'],
            'source':'JTF-2.2.1'
        },
        // JTF-2.2.1 漢字を使い分ける
        {
            'expected':'箇所',
            'pattern':['個所'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'箇条書き',
            'pattern':['個条書き'],
            'source':'JTF-2.2.1'
        },
        /* いい感じの検知方法が見当たらないのでパス
        {
            'expected':'付属する',
            'pattern':['附属する'],
            'source':'JTF-2.2.1'
        },
        */
        {
            'expected':'摩耗',
            'pattern':['磨耗'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'摩滅',
            'pattern':['磨滅'],
            'source':'JTF-2.2.1'
        },
        // JTF=2.2.1  品詞・意味で使い分ける
        {
            'expected':'および',
            'pattern':['及び'],
            'tokenCheck':['接続詞','*','及び'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'及ぶ',
            'pattern':['およぶ'],
            'tokenCheck':['動詞','自立','およぶ'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'いたします',
            'pattern':['致します'],
            'tokenCheck':['動詞','非自立','致す'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'致す',
            'pattern':['いたす'],
            'tokenCheck':['動詞','自立','致す'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'したがって',
            'pattern':['従って'],
            'tokenCheck':['接続詞','*','従って'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'従う',
            'pattern':['したがう'],
            'tokenCheck':['動詞','自立','したがう'],
            'source':'JTF-2.2.1'
        },
        /*　これは形態素解析でも無理だと思う。。。
        {
            'expected':'出す',
            'pattern':['だす'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'だす',
            'pattern':['出す'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'付く',
            'pattern':['つく'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'付く',
            'pattern':['つく'],
            'source':'JTF-2.2.1'
        },
        */
        {
            'expected':'つき',
            'pattern':['付き'],
            'tokenCheck':['名詞','接尾','付き'],　//手付きや目付きは一つの名詞になってしまうので検知できない。。。
            'source':'JTF-2.2.1'
            //　好み
        },
        {
            'expected':'とおり',
            'pattern':['通り'],
            'tokenCheck':['名詞','非自立','通り'],　//「以下の通り」の通りは「名詞・一般」になってしまう。これを対象にしてしまうと、道路を意味する「通り」が平仮名になってしまう。。。
            'source':'JTF-2.2.1'
        },
        {
            'expected':'通り',
            'pattern':['とおり'],
            'tokenCheck':['名詞','接尾','とおり'],　
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ほしい',
            'pattern':['欲しい'],
            'tokenCheck':['形容詞','非自立','欲しい'],　
            'source':'JTF-2.2.1'
        },
        {
            'expected':'欲しい',
            'pattern':['ほしい'],
            'tokenCheck':['形容詞','自立','ほしい'],　
            'source':'JTF-2.2.1'
        },
        // JTF=2.2.1  複数の表記方法が一般的で、実務文書で頻出する語
        {
            'expected':'あまりに',
            'pattern':['余りに'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'うえで',
            'pattern':['上で'],
            'tokenCheck':['名詞','非自立','^上$'],　
            'source':'JTF-2.2.1'
        },
        {
            'expected':'きわめて',
            'pattern':['極めて'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'さまざま',
            'pattern':['様々'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'すでに',
            'pattern':['既に'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'すべて',
            'pattern':['全て'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ともに',
            'pattern':['共に'],
            'tokenCheck':['副詞','一般','^共に$'],　
            'source':'JTF-2.2.1'
        },
        {
            'expected':'たとえば',
            'pattern':['例えば'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ただちに',
            'pattern':['直ちに'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'とうてい',
            'pattern':['到底'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'はたして',
            'pattern':['果たして'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ひときわ',
            'pattern':['一際'],
            'source':'JTF-2.2.1'
        },
        /* kuromojiのテストツールが、「一度」を「ひとたび」と認識しないので対応できない
        {
            'expected':'ひとたび',
            'pattern':['一度'],
            'source':'JTF-2.2.1'
        },
        */
        {
            'expected':'ほか',
            'pattern':['他'],
            'tokenCheck':['名詞','一般','^他$'],　// 他を探す
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ほか',
            'tokenCheck':['名詞','非自立','^他$'],　// この他に必要なもの
            'pattern':['他'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ほか',
            'pattern':['外'],
            'tokenCheck':['名詞','副詞可能','^外$'],　// 思いの外
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ほかならぬ',
            'pattern':['他ならぬ','外ならぬ'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'まったく',
            'pattern':['全く'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'もともと',
            'pattern':['元々'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'わかる',
            'pattern':['分かる'],
            'tokenCheck':['動詞','自立','分かる'],　
            'source':'JTF-2.2.1'
        },
        {
            'expected':'わかる',
            'pattern':['解る'],
            'tokenCheck':['動詞','自立','解る'],　
            'source':'JTF-2.2.1'
        },
        {
            'expected':'わかる',
            'pattern':['判る'],
            'tokenCheck':['動詞','自立','判る'],　
            'source':'JTF-2.2.1'
        },
        {
            'expected':'ひとつひとつ',
            'pattern':['一つ一つ'],
            'source':'JTF-2.2.1'
        },
        {
            'expected':'わたし',
            'pattern':['私'],
            'tokenCheck':['名詞','代名詞','^私$'],　
            'source':'JTF-2.2.1'
        },
        {
            'expected':'われわれ',
            'pattern':['我々'],
            'tokenCheck':['名詞','代名詞','我々'],　
            'source':'JTF-2.2.1'
        },
        // 過剰検知しそう。適宜形態素解析に切り替える
        {
            'expected':'わが',
            'pattern':['我が'],
            'source':'JTF-2.2.1'
        },
        // JTF-2.2.2. 算用数字と漢数字の使い分け()(算用数字を使う)
        // 基本的に数を示す数字は算用数字に。
        {
            'expected':'1',
            'pattern':['一'],
            'tokenCheck':['名詞','数','[一二三四五六七八九十百千]'],　
            'source':'JTF-2.2.2'
        },
        // ただし、漢数字が望ましいものは個別に算用数字をエラーとする。
        {
            'expected':'[一-九]つ',
            'pattern':['[1-9]つ'],
            'source':'JTF-2.2.2'
        },
        {
            'expected':'[一-九]次',
            'pattern':['[1-9]次'],
            'source':'JTF-2.2.2'
        },
        {
            'expected':'五大陸',
            'pattern':['5大陸'],
            'source':'JTF-2.2.2'
        },
        // JTF-2.2.3. 一部の助数詞の表記
        {
            'expected':'「か」',
            'pattern':['「ヵ」、「カ」、「ヶ」、「ケ」、「箇」、「個」'],
            'tokenCheck':['名詞','接尾','[ヵカヶケ箇個][月所国年]'],　
            'source':'JTF-2.2.3'
        }

    ];

    var tokenCheck = function (sentence){
        for (var k = 0; k < sentence.tokens.length; k++) {
            // 2.2.1
            if ( sentence.tokens[k].tags[0] == terms[i]['tokenCheck'][0] &&
                 sentence.tokens[k].tags[1] == terms[i]['tokenCheck'][1] &&　
                 sentence.tokens[k].tags[6] == terms[i]['tokenCheck'][2] ){
                addError('【文書規約違反：' + terms[i]['source'] + '】　「' + sentence.tokens[k].surface + '」を修正してください。（正：' + terms[i]['expected'] + '　誤：' + terms[i]['pattern'][j] + '）' , sentence);
            } else {
                // 2.2.2,2.2.3
                if (
                     sentence.tokens[k].tags[0] == terms[i]['tokenCheck'][0] &&
                     sentence.tokens[k].tags[1] == terms[i]['tokenCheck'][1] &&　
                     sentence.tokens[k].tags[6].match(new RegExp(terms[i]['tokenCheck'][2]))
                   ){
                    // 「名詞で数の漢数字は算用数字であるべし」の正規表現に引っかかってしまったものの中から、漢数字が正しい表現を除外する
                    if ( (k > 0 && sentence.tokens[k - 1].tags[6] == '数') ||
                        　(k < sentence.tokens.length - 1 && sentence.tokens[k].tags[6].match(new RegExp(terms[i]['tokenCheck'][2])) && sentence.tokens[k+1].tags[6]=='次')　||　
                         (k < sentence.tokens.length - 1 && sentence.tokens[k].tags[6].match(new RegExp(terms[i]['tokenCheck'][2])) && sentence.tokens[k+1].tags[6]=='大陸')){
                    } else {
                        addError('【文書規約違反：' + terms[i]['source'] + '】　「' + sentence.tokens[k].surface + '」を修正してください。（正：' + terms[i]['expected'] + '　誤：' + terms[i]['pattern'][j] + '）' , sentence);
                    }
                }
            }
        }
    }

    for ( var i = 0; i < terms.length; i++ ) {
        for ( var j = 0; j < terms[i]['pattern'].length; j++ ) {
            var regex = new RegExp( terms[i]['pattern'][j]);
            // 形態素解析するかどうか
            if ( 'tokenCheck'　in terms[i] ) {
                tokenCheck(sentence);
            } else {
                if ( sentence.content.match(regex) ) {
                    addError('【文書規約違反：' + terms[i]['source'] + '】　「' + terms[i]['pattern'][j] + '」を「' + terms[i]['expected'] + '」に修正してください', sentence);
                }
            };
        };
    };
};
