# kawamataryoの職務経歴書

![textlint](https://img.shields.io/github/workflow/status/kawamataryo/resume/lint%20text?label=textlint&logo=github&color=yellow)
![build pdf](https://img.shields.io/github/workflow/status/kawamataryo/resume/build-pdf?label=build%20pdf&logo=github)
![create issue](https://img.shields.io/github/workflow/status/kawamataryo/resume/create%20issue?label=create%20issue&logo=github&color=orange)
![release date](https://img.shields.io/github/release-date/kawamataryo/resume?color=blue&logo=github)

[ [English](https://github.com/kawamataryo/resume) | 日本語 ]

## Data


- [GitHub Pages](https://kawamataryo.github.io/resume/)  
- [PDF](https://github.com/kawamataryo/resume/releases)  
- [File](https://github.com/kawamataryo/resume/blob/master/docs/README.md)  

## Features

### 💅 Lint text

[textlint](https://github.com/textlint/textlint) での自動校正が可能です。

```
$ yarn lint --fix
```

[husky](https://github.com/typicode/husky) によってcommit前にも自動で実行されます。  
校正のルールは`.textlintrc`に記載しています。


### 📝 Convert Markdown to PDF

[md-to-pdf](https://www.npmjs.com/package/md-to-pdf) でのPDF生成が可能です。

```
$ yarn build:pdf
```


出力されるPDFはCSSで任意のスタイルを設定可能です。`pdf-configs/style.css`を編集してください。  

### 🛠 Create release

`v**` tagをつけてpushするとGitHub Actionsでビルドが走り、PDFの生成、Releaseの作成、AssetsへPDFの登録が実行されます。

```
$ git commit -m "add job"
$ git tag v1.0
$ git push origin --tags
```

### 📆 Remind update

GitHub Actionsのschedule triggerで3ヶ月に1回、職務経歴書の内容更新を促すissueが自動生成されます。

期間の変更、Jobの停止は[.github/workflows/create-issue.yml](https://github.com/kawamataryo/resume/blob/master/.github/workflows/create-issue.yml) を編集してください。

