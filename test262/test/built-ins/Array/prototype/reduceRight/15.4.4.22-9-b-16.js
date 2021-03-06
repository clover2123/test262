// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.4.4.22-9-b-16
description: >
    Array.prototype.reduceRight - decreasing length of array in step 8
    does not delete non-configurable properties
flags: [noStrict]
includes: [runTestCase.js]
---*/

function testcase() {

        var testResult = false;

        function callbackfn(prevVal, curVal, idx, obj) {
            if (idx === 2 && curVal === "unconfigurable") {
                testResult = true;
            }
        }

        var arr = [0, 1, 2, 3];

        Object.defineProperty(arr, "2", {
            get: function () {
                return "unconfigurable";
            },
            configurable: false
        });

        Object.defineProperty(arr, "3", {
            get: function () {
                arr.length = 2;
                return 1;
            },
            configurable: true
        });

        arr.reduceRight(callbackfn);

        return testResult;
    }
runTestCase(testcase);
