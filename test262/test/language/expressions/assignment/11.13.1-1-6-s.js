// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
info: PutValue operates only on references (see step 3.a).
es5id: 11.13.1-1-6-s
description: >
    simple assignment throws ReferenceError if LeftHandSide is an
    unresolvable reference (base obj undefined)
includes: [runTestCase.js]
---*/

function testcase() {
  
  try {
    __ES3_1_test_suite_test_11_13_1_unique_id_0__.x = 42;
    return false;
  }
  catch (e) {
    return (e instanceof ReferenceError);
  }
 }
runTestCase(testcase);
