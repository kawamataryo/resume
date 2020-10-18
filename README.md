# kawamataryo's resume

[![textlint](https://img.shields.io/github/workflow/status/kawamataryo/resume/lint%20text?label=textlint&logo=github&color=yellow)](https://github.com/kawamataryo/resume/actions?query=workflow%3A%22lint+text%22)
[![build pdf](https://img.shields.io/github/workflow/status/kawamataryo/resume/build-pdf?label=build%20pdf&logo=github)](https://github.com/kawamataryo/resume/actions?query=workflow%3A%22build+pdf%22)
[![create issue](https://img.shields.io/github/workflow/status/kawamataryo/resume/create%20issue?label=create%20issue&logo=github&color=orange)](https://github.com/kawamataryo/resume/actions?query=workflow%3A%22create+issue%22)
[![release date](https://img.shields.io/github/release-date/kawamataryo/resume?color=blue&logo=github)](https://github.com/kawamataryo/resume/releases)

[ English | [日本語](https://github.com/kawamataryo/resume/blob/master/README.ja.md) ]

## Data

- [GitHub Pages](https://kawamataryo.github.io/resume/)  
- [PDF](https://github.com/kawamataryo/resume/releases)  
- [File](https://github.com/kawamataryo/resume/blob/master/docs/README.md)  
## Features

### 💅 Lint text

Automatic proofreading with [textlint](https://github.com/textlint/textlint).

```
$ yarn lint --fix
```
It is also automatically executed when pre-commit by [husky](https://github.com/typicode/husky).  
proofreading rules are set with `.textlintrc`.



### 📝 Convert Markdown to PDF

You can generate PDF with [md-to-pdf](https://www.npmjs.com/package/md-to-pdf).


```
$ yarn build:pdf
```

The output PDF can be styled as you like with CSS. Edit the `pdf-configs/style.css`.  

### 🛠 Create release

When you push with a `v**` tag, GitHub Actions will run the build, generate the PDF, create a Release, and register the PDF to Assets.

```
$ git commit -m "add job"
$ git tag v1.0
$ git push origin --tags
```

### 📆 Remind update

Automatically generate issues every three months with GitHub Actions Schedules triggers to prompt you to update your resume.

To change the duration or stop the job, edit `.github/workflows/create-issue.yml`.  
To change the issue contents, edit `.github/ISSUE_TEMPLATE.md`.


