const fs = require('fs');
const https = require('https');
const http = require('http');

const logos = {
  'infraon': 'https://infraon.io/wp-content/uploads/2023/12/infraon-logo-blue.svg',
  'ternary': 'https://ternary.app/wp-content/uploads/2021/04/Ternary-Logo-Dark.svg',
  'fanruan': 'https://www.fanruan.com/wp-content/uploads/2022/01/logo.svg',
  'sahl': 'https://sahl.sa/images/logo.png', // guessing
  'unirsal': 'https://unirsal.com/logo.png' // guessing
};

Object.entries(logos).forEach(([name, url]) => {
  const file = fs.createWriteStream(`public/images/logos/${name}.svg`);
  const client = url.startsWith('https') ? https : http;
  client.get(url, function(response) {
    if (response.statusCode === 200) {
      response.pipe(file);
      console.log(`Downloaded ${name}`);
    } else {
      console.log(`Failed to download ${name}: ${response.statusCode}`);
      file.close();
      fs.unlink(`public/images/logos/${name}.svg`, () => {});
    }
  }).on('error', function(err) {
    console.log(`Error downloading ${name}: ${err.message}`);
    fs.unlink(`public/images/logos/${name}.svg`, () => {});
  });
});
