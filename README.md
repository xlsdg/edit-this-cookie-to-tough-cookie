# edit-this-cookie-to-tough-cookie
Convert EditThisCookie json format to ToughCookie json file


## Installation

```
$ npm install --save etc2tc
```


## Usage

```
const etc2tc = require('etc2tc');
```

Use Request.js and Tough-Cookie-Kit, the **etc2tc** method:

```
let gCookie = Request.jar(new CookieKit(etc2tc('cookies.txt', 'cookies.json')));
```

# License

MIT
