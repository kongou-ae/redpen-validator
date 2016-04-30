# redpen-validator

Javascript拡張を利用したRedPenのValidatorです。

## jtfStyleGuideValidator.js

[JTF 日本語標準スタイルガイド
（翻訳用） ](http://www.jtf.jp/jp/style_guide/pdf/jtf_style_guide.pdf)のスタイルに準拠しているかどうかを精査します。現在対応している項目は「2.2.1. ひらがなと漢字の使い分け」の一部のみです。

「複数の表記方法が一般的で、実務文書で頻出する語」はひらがなが正しいとしています。

## termsValidator.js

jtfStyleGuideValidator.jsの元ネタとなっているValidatorです。`terms`配列に登録されている表記の規則を利用して、文章に規則から外れた「ゆらぎ」が含まれているかを精査します。精査方法は正規表現と形態素解析の二つをサポートしています。

### 正規表現による精査

正規表現による精査を行う場合、Terms配列には以下のプロパティを持ったオブジェクトを登録してください。

|項目     |型     |登録内容|
|--------|--------|-------|
|expected|String  |正しい表記|
|pattern　|Array　　|ゆらいでいる表記|
|source　 |String  |規約の原典|

#### 正規表現による精査を行う場合の登録例

```javascript
{
    'expected':'ファイアウォール',
    'pattern':['ファイアーウォール','ファイヤーウォール','ファイヤウォール','ファイヤーウオール'],
    'source':'MyCompany'
}
```

#### 正規表現による精査を行った場合のエラー通知

```
tmp.md:35: ValidationError[JavaScript], [termsValidator.js] 文書規約違反(MyCompany)です。「ファイアーウォール」を「ファイアウォール」に修正してください at line: ファイアーウォール
tmp.md:37: ValidationError[JavaScript], [termsValidator.js] 文書規約違反(MyCompany)です。「ファイヤーウォール」を「ファイアウォール」に修正してください at line: ファイヤーウォール
tmp.md:39: ValidationError[JavaScript], [termsValidator.js] 文書規約違反(MyCompany)です。「ファイヤウォール」を「ファイアウォール」に修正してください at line: ファイヤウォール
tmp.md:41: ValidationError[JavaScript], [termsValidator.js] 文書規約違反(MyCompany)です。「ファイヤーウオール」を「ファイアウォール」に修正してください at line: ファイヤーウオール
```

### 形態素解析による精査

形態素解析による精査を行う場合、Terms配列には以下のプロパティを持ったオブジェクトを登録してください。

|項目        |型     |登録内容|
|-----------|--------|-------|
|expected   |String  |正しい表記|
|pattern　   |Array　　|ゆらいでいる表記|
|tokenCheck |Array   |ゆらいでいる表記を特定するために利用する形態素解析の結果|
|source　    |String  |ルールの名称|

`tokenCheck`配列には、kuromojiによる形態素解析の結果を登録する必要があります。形態素解析の結果は[kuromojiのデモサイト](http://atilika.org/kuromoji/)で取得するのが簡単です。

|項目          |型     |登録内容|
|--------------|--------|-------|
|tokenCheck[0] |String  |`Part-of-Speech`の1つ目（kuromojiが生成するTokenに含まれるFeatureの1つ目）|
|tokenCheck[1] |String　　|`Part-of-Speech`の2つ目（kuromojiが生成するTokenに含まれるFeatureの2つ目）|
|tokenCheck[2]  |String   |`Base form`（kuromojiが生成するTokenに含まれるFeatureの7つ目）|


#### 形態素解析による精査を行う場合の登録例

「～すること」が正しく、「～する事」がゆらぎである場合、以下のように登録します。正規表現で「事」を登録してしまうと、「事件」がエラーになってしまいます。ですが、形態素解析を利用すると「事件」は「事件」という単語として処理されるため、「事」のゆらぎとして処理されなくなります。

```javascript
{
    'expected':'こと',
    'pattern':['事'],
    'tokenCheck':['名詞','非自立','事'],
    'source':'MyCompany'
}
```

また、以下の規約を登録した場合、「出来る」だけでなく「出来ます」もエラーとして検知します。これは「出来ます」を形態素解析することで抽出される単語「出来」について、品詞が「動詞、自立」、原型が「出来る」と判定されるためです。形態素解析による精査の規約を登録する場合は、規約としたい表現を形態素解析し、品詞と原型を確認することをお勧めします。

```javascript
{
    'expected':'できる',
    'pattern':['出来る'],
    'tokenCheck':['動詞','自立','出来る'],
    'source':'JTF-2.2.1'
},
```

### 形態素解析による精査を行った場合のエラー通知

```
tmp.md:43: ValidationError[JavaScript], [termsValidator.js] 文書規約違反(JTF-2.2.1)です。「出来」を修正してください。（正：できる　誤：出来る） at line: 出来ます
tmp.md:47: ValidationError[JavaScript], [termsValidator.js] 文書規約違反(JTF-2.2.1)です。「但し」を修正してください。（正：ただし　誤：但し） at line: 但し
tmp.md:49: ValidationError[JavaScript], [termsValidator.js] 文書規約違反(JTF-2.2.1)です。「達」を修正してください。（正：たち　誤：達） at line: 先生達
tmp.md:51: ValidationError[JavaScript], [termsValidator.js] 文書規約違反(JTF-2.2.1)です。「又は」を修正してください。（正：または　誤：又は） at line: 又は
```
