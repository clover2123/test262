// Copyright (c) 2013 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
/*---
es6id: 22.1.3.8
description: >
    The find() method returns a value in the array, if an
    element in the array satisfies the provided testing function.
    Otherwise undefined is returned.
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
includes: [compareArray.js]
---*/


// Test String as a thisArg
var found = [1, 2, 3].find(function(val, key) {
  return this.charAt(Number(key)) === String(val);
}, "321");
assert.sameValue(2, found);

// Test object as a thisArg
var thisArg = {
  elementAt: function(key) {
    return this[key];
  }
};
Array.prototype.push.apply(thisArg, ["c", "b", "a"]);

found = ["a", "b", "c"].find(function(val, key) {
  return this.elementAt(key) === val;
}, thisArg);
assert.sameValue("b", found);

// Check thisArg parameter does not change.
var a = [];
[1, 2].find(function() { a.push(this) }, {});
assert.sameValue(a[0], a[1]);

// In strict mode primitive values should not be coerced to an object.
a = [];
[1, 2].find(function() { "use strict"; a.push(this); }, "");
assert.sameValue("", a[0]);
assert.sameValue(a[0], a[1]);
