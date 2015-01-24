# DataType-FU [<img src="https://travis-ci.org/nuxy/DataType-FU.svg?branch=master" alt="Build Status" />](https://travis-ci.org/nuxy/DataType-FU)

One of the most annoying things I find about the JavaScript language is the lack of support for strict typing when declaring function variable arguments.  Because of this I’m forced to litter my code with conditions that contain `typeof` and `instanceof` to type check each argument.

This is my attempt to resolve this madness.

## Installation

This package can be easily installed using:

[Bower](http://bower.io)

    $ bower install datatype-fu

[NPM](https://www.npmjs.org)

    $ npm install datatype-fu

## Use Example

```
var fu = require('datatype-fu').fu;   // Node usage

// standard types
var doSomething = fu(
    ['Array', 'Boolean', 'Function', 'Number', 'Object', 'String', 'undefined'],
    function(arr, bool, func, num, obj, str, und) {

        // do something with the values
    }
);

doSomething(
    ['bucket1', 'bucket2', 'bucket3'],
    true,
    function() {},
    1234567890,
    { key: 'value' },
    'Hello World',
    undefined
);

// wildcard and conditional types
var doSomething = fu(
    ['*', 'Array|Boolean|undefined'],
    function(any, cond) { 

        // do something with the values
    }
);
```

## Performance

General test cases have been created on [jsPerf](http://jsperf.com/datatype-fu) to measure fu'd operations across supported web browsers.

## Maintainer

For feedback, bug reports, or other comments, feel free to contact me at: **devel** _at_ **mbrooks** _dot_ **info**

## License and Warranty

This package is distributed in the hope that it will be useful, but without any warranty; without even the implied warranty of merchantability or fitness for a particular purpose.

_DataType-FU_ is provided under the terms of the [MIT license](http://www.opensource.org/licenses/mit-license.php)

## Author

[Marc S. Brooks](https://github.com/nuxy)
