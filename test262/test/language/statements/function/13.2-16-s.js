// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 13.2-16-s
description: >
    StrictMode - enumerating over a function object looking for
    'arguments' fails inside the function
includes: [runTestCase.js]
---*/

function testcase() {
            var foo = new Function("'use strict'; for (var tempIndex in this) {if (tempIndex===\"arguments\") {return false;}}; return true;");
            return foo.call(foo);
}
runTestCase(testcase);
