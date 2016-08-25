# redpen-validator

Javascript拡張を利用したRedPenのValidatorです。

![](https://circleci.com/gh/kongou-ae/redpen-validator.svg?style=shield&circle-token=%206c4f0d89b0efed4089120942326e94013006d1c2) [![Code Climate](https://codeclimate.com/github/kongou-ae/redpen-validator/badges/gpa.svg)](https://codeclimate.com/github/kongou-ae/redpen-validator)

# 使い方

RedPenのコンフィグファイルに以下を追記します。

```xml
<validator name="JavaScript" >
    <property name="script-path" value="/Path/to/this/repo/on/your/env" />
</validator>
```

## 各ファイルが対応する検査項目

|ファイル名                    |検査項目                   |参考文献               |
|----------------------------|--------------------------|-----------------------|
|use-joyo-Kanji.js           |常用漢字を使っているか       |JTF 日本語標準スタイルガイド（翻訳用） 2.1.2|
|katakana-must-be-two-byte.js|全角のカタカナを使っているか   |JTF 日本語標準スタイルガイド（翻訳用） 2.1.5|
|numeral-must-be-hankaku.js  |半角の算用数字を使っているか  |JTF 日本語標準スタイルガイド（翻訳用） 2.1.8|
|alphabet-must-be-one-byte.js|半角のアルファベットを使っているか |JTF 日本語標準スタイルガイド（翻訳用） 2.1.9|
|use-hiragana-and-kanji-properly.js |ひらがなと漢字の使い分け|JTF 日本語標準スタイルガイド（翻訳用） 2.2.1|
|use-numeral-properly.js     |算用数字と漢数字の使い分け　　 |JTF 日本語標準スタイルガイド（翻訳用） 2.2.2|
|ka-is-written-in-hiragana.js|助数詞にともなう「か」の表記    |JTF 日本語標準スタイルガイド（翻訳用） 2.2.3|
|symbol.js                   |記号の使い方が適切か         |JTF 日本語標準スタイルガイド（翻訳用） 4.2 & 4.3|
|use-assertive-style.js      |断定を避ける表現             |use-assertive-style.js内に記載|
|use-literary-style.js　　　  |口語表現                   |use-literary-style.js内に記載  |
|dont-use-kosoado.js         |こそあど言葉                 |dont-use-kosoado.js内に記載  |
|dont-use-can-do.js          |することができる              |dont-use-can-do.js内に記載 |
|custom-pattern.js           |自分で登録した規則が含まれているか　 |なし



## custom-pattern.js

自分で表記の規則を登録して利用する拡張です。`terms`配列に登録されている表記の規則を利用して、文章に規則から外れた表現が含まれているかを検査します。検査方法は正規表現と形態素解析の二つをサポートしています。

### 正規表現による検査

正規表現による検査を行う場合、`terms`配列に以下パラメータを持ったオブジェクトを登録します。

```
{
    'pattern':'ではないだろうか',
    'message':'断定を避ける表現です。断定系を使ってください。',
}
```

### 形態素解析による検査

形態素解析による検査を行う場合、`terms`配列に以下プロパティを持ったオブジェクトを登録します。

```
{
    'pattern':'考えられる',
    'message':'断定を避ける表現です。断定系を使ってください。',
    'tokens':[
        {
            'tags0':'動詞',
            'tags1':'自立',
            'tags6':'考える'
        },
        {
            'tags0':'動詞',
            'tags1':'接尾',
            'tags6':'られる'
        }
    ]
},
```

`tokens`プロパティには、kuromojiによる形態素解析の結果を登録します。各項目とkuromojiによる形態素解析の結果は、以下の通り紐づいています。kuromojiによる形態素解析の結果は[kuromojiのデモサイト](http://atilika.org/kuromoji/)で取得するのが簡単です。

|項目   |登録内容|
|------|-------|
|tags0 |`Part-of-Speech`の1つ目（kuromojiが生成するTokenに含まれるFeatureの1つ目）|
|tags1 |`Part-of-Speech`の2つ目（kuromojiが生成するTokenに含まれるFeatureの2つ目）|
|tags6 |`Base form`（kuromojiが生成するTokenに含まれるFeatureの7つ目）|

## 謝辞

use-joyo-Kanji.jsの作成にあたっては、以下のサイトを参考にさせていただきました。感謝します。

- [【みんなの知識 ちょっと便利帳】入力した文章・文字が常用漢字かどうかを調べる](http://www.benricho.org/kanji/kyoikukanji/check-jyoyo-kanji.html)
- [漢字にマッチする JavaScript の正規表現パターン: Days on the Moon](http://nanto.asablo.jp/blog/2015/12/31/7966713)
