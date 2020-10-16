const translate = require('google-translate-open-api');
var fs = require('fs');

const hoge = async () => {
  const text = fs.readFileSync('./docs/README.md', 'utf8');
  console.log(text)
  const result = await translate.default(text, {
    to: "en",
  });
  const data = result.data[0];
  fs.writeFileSync('./docs/README.en.md', data, {flag: "w"});
}

hoge()
