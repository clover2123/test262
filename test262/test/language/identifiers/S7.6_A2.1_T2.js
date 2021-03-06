// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: "IdentifierPart :: IdentifierStart"
es5id: 7.6_A2.1_T2
description: "IdentifierStart :: $"
---*/

var result;

//CHECK#1
try {
  var identifier = "x" + "$";     
  eval("var " + identifier + "=1; result = x$");
  if (result !== 1) {
    $ERROR('#1.1: var identifier = "x" + "$"; eval("var " + identifier + "=1; result = x$"); result === 1. Actual: ' + (result));
  }
} catch (e) {
  $ERROR('#1.2: var identifier = "x" + "$"; eval("var " + identifier + "=1; result = x$"); result === 1. Actual: ' + (result));
}

//CHECK#2
try {
  var identifier = String.fromCharCode(0x0078) + "$";     
  eval("var " + identifier + "=2; result = x$");
  if (result !== 2) {
    $ERROR('#2.1: var identifier = String.fromCharCode(0x0078) + "$"; eval("var " + identifier + "=2; result = x$"); result === 2. Actual: ' + (result));
  }
} catch (e) {
  $ERROR('#2.2: var identifier = String.fromCharCode(0x0078) + "$"; eval("var " + identifier + "=2; result = x$"); result === 2. Actual: ' + (result));
}

//CHECK#3
try {
  var identifier = "$" + "$";     
  eval("var " + identifier + "=3; result = $$");
  if (result !== 3) {
    $ERROR('#3.1: var identifier = "$" + "$"; eval("var " + identifier + "=3; result = $$"); result === 3. Actual: ' + (result));
  }
} catch (e) {
  $ERROR('#3.2: var identifier = "$" + "$"; eval("var " + identifier + "=3; result = $$"); result === 3. Actual: ' + (result));
}

//CHECK#4
try {
  var identifier = String.fromCharCode(0x0024) + String.fromCharCode(0x0024);     
  eval("var " + identifier + "=4; result = $$");
  if (result !== 4) {
    $ERROR('#4.1: var identifier = String.fromCharCode(0x0024) + String.fromCharCode(0x0024); eval("var " + identifier + "=4; result = $$"); result === 4. Actual: ' + (result));
  }
} catch (e) {
  $ERROR('#4.2: var identifier = String.fromCharCode(0x0024) + String.fromCharCode(0x0024); eval("var " + identifier + "=4; result = $$"); result === 4. Actual: ' + (result));
}

//CHECK#5
try {
  var identifier = "_" + "$";     
  eval("var " + identifier + "=5; result = _$");
  if (result !== 5) {
    $ERROR('#5.1: var identifier = "_" + "$"; eval("var " + identifier + "=5; result = _$"); result === 5. Actual: ' + (result));
  }
} catch (e) {
  $ERROR('#5.2: var identifier = "_" + "$"; eval("var " + identifier + "=5; result = _$"); result === 5. Actual: ' + (result));
}

//CHECK#6
try {
  var \u0078$ = 6;
  if (x$ !== 6) {
    $ERROR('#6.1: var \\u0078$ = 1; x$ === 6. Actual: ' + (x$));
  }
} catch (e) {
  $ERROR('#6.2: var \\u0078$ = 1; x$ === 6. Actual: ' + (x$));
}
