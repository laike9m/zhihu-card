const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler(['src/index.html', 'src/theme/github.html', 'src/theme/zhihu.html']);
const app = express();

app.get('/', (req, res, next) => {
  req.url = '/index.html';
  app._router.handle(req, res, next);
});

app.use(bundler.middleware());

const port = Number(process.env.PORT || 1234);
require('parcel-bundler/lib/utils/openInBrowser')(`http://localhost:${port}`, true);
app.listen(port);
console.log(`listening at http://localhost:${port}`);
