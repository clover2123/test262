// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 10.5-7-b-2-s
description: Arguments object index assignment is allowed
includes: [runTestCase.js]
---*/

function testcase() {
        function _10_5_7_b_2_fun() {
            arguments[7] = 12;
            return arguments[7] === 12;
        };

        return _10_5_7_b_2_fun(30);
    }
runTestCase(testcase);
