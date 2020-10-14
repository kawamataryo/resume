# kawamataryoの職務経歴書

# Data

Site: 
PDF: https://github.com/kawamataryo/resume/releases  
Markdown: https://github.com/kawamataryo/resume/blob/master/RESUME.md  

# Usage


## Lint resume

textlintでの校正が可能です。

```
$ yarn lint
```

huskyによってcommit前にも自動で実行されます。  
設定は`.textlintrc`を修正してください。
https://github.com/kawamataryo/resume/blob/master/.textlintrc


## build PDF

tagをつけてコミットするとGitHub Actionsでビルドが走り、Releasesに成果物としてPDFが生成されます。

https://github.com/kawamataryo/resume/blob/master/.github/workflows/action.yml


出力されるPDFにはCSSで任意のスタイルを設定可能です。詳細は`pdf-configs`をご覧ください。  
https://github.com/kawamataryo/resume/tree/master/pdf-configs
