mocha-csslint
-------------

Run CSSLint as Mocha tests.

To install in your node.js project as devDependency, run this command, in the root of your project
```
npm install mocha-csslint --save-dev
```

usage
-----
Mocha defaults to looking for your test specs in the `test` folder of your project.
Add this file as `test/csslint.spec.js` in your project, with the following content:

```js
require('mocha-csslint')('/client/static/css');
```

You should point to the place where you keep your css files instead of `'/client/static/css'` above.

That is it you are done.

You can still specify you csslint options in a `.csslintrc` file in the root of your project (see this project for an example)

To grep only the CSSLint test, just do
```
mocha --grep csslint
```

If you want to run CSSLint on several separate folders you can do:

```js
require('mocha-csslint')(['/client/static/css', '/clinet2/css']);
```

Why?
---
This module was created to:

- Make adding CSSLint testing to a project using Mocha as easy as possible
- Make it easy to piggyback on all the different Mocha reporters (dot, spec, teamcity etc) for CSSLint output
- Make sure that you get a click-able link directly to the problem in WebStorm, when CSSLint fails
- Make sure that there is no unnecessary noise in the test output