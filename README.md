# kawamataryoの職務経歴書
![build pdf](https://github.com/kawamataryo/resume/workflows/build%20pdf/badge.svg)
![create issue](https://github.com/kawamataryo/resume/workflows/create%20issue/badge.svg)


- [GitHub Pages](https://kawamataryo.github.io/resume/)  
- [PDF](https://github.com/kawamataryo/resume/releases)  
- [File](https://github.com/kawamataryo/resume/blob/master/docs/README.md)  

## Features

### Lint text

[textlint](https://github.com/textlint/textlint) での校正が可能です。

```
$ yarn lint
```

[husky](https://github.com/typicode/husky) によってcommit前にも自動で実行されます。  
校正のルールは`.textlintrc`に記載しています。


### Build PDF

[md-to-pdf](https://www.npmjs.com/package/md-to-pdf) でのPDF生成が可能です。

```
$ yarn build:pdf
```


出力されるPDFはCSSで任意のスタイルを設定可能です。`pdf-configs/style.css`を編集してください。  

### Create release

`v**` tagをつけてpushするとGitHub Actionsでビルドが走り、PDFの生成、Releaseの作成、AssetsへPDFの登録が実行されます。

```
$ git commit -m "add job"
$ git tag v1.0
$ git push origin --tags
```

### Create issue

GitHub Actionsのschedule triggerで3ヶ月に1回、職務経歴書の内容更新を促すissueが自動生成されます。

期間の変更、Jobの停止は[.github/workflows/create-issue.yml](https://github.com/kawamataryo/resume/blob/master/.github/workflows/create-issue.yml) を編集してください。


