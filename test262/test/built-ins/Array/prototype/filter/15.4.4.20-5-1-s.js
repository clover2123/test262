// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.4.4.20-5-1-s
description: Array.prototype.filter - thisArg not passed to strict callbackfn
flags: [noStrict]
includes: [runTestCase.js]
---*/

function testcase() {
  var innerThisCorrect = false;
  
  function callbackfn(val, idx, obj) {
    "use strict";
    innerThisCorrect = this===undefined;
    return true;
  }

  [1].filter(callbackfn);
  return innerThisCorrect;    
 }
runTestCase(testcase);
