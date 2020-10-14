# kawamataryoの職務経歴書

# Data

[Web](https://kawamataryo.github.io/resume/)  
[PDF](https://github.com/kawamataryo/resume/releases)  
[Markdown](https://github.com/kawamataryo/resume/blob/master/docs/README.md)  

# Usage


## Lint text

textlintでの校正が可能です。

```
$ yarn lint
```

huskyによってcommit前にも自動で実行されます。  
設定は`.textlintrc`を修正してください。


## Build PDF

md-to-pdfでのPDF生成が可能です。

```
$ yarn build:pdf
```

tagをつけてコミットするとGitHub Actionsでビルドが走り、Releasesに成果物としてPDFが生成されます。


出力されるPDFにはCSSで任意のスタイルを設定可能です。詳細は`pdf-configs`をご覧ください。  
