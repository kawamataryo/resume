# kawamataryoの職務経歴書

# Data

[Web](https://kawamataryo.github.io/resume/)  
[PDF](https://github.com/kawamataryo/resume/releases)  
[Markdown](https://github.com/kawamataryo/resume/blob/master/docs/README.md)  

# Usage


## Lint text

[textlint](https://github.com/textlint/textlint) での校正が可能です。

```
$ yarn lint
```

[husky](https://github.com/typicode/husky) によってcommit前にも自動で実行されます。  
校正のルールは`.textlintrc`をご覧ください。


## Build PDF

[md-to-pdf](https://www.npmjs.com/package/md-to-pdf) でのPDF生成が可能です。

```
$ yarn build:pdf
```

tagをつけてpushするとGitHub Actionsでビルドが走り、Releasesに成果物としてPDFが生成されます。


出力されるPDFはCSSで任意のスタイルを設定可能です。詳細は`pdf-configs`をご覧ください。  
