// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 10.4.3-1-29gs
description: >
    Strict - checking 'this' from a global scope (Anonymous
    FunctionExpression defined within a FunctionDeclaration inside
    strict mode)
flags: [onlyStrict]
---*/

function f1() {
    return ((function () {
        return typeof this;
    })()==="undefined") && ((typeof this)==="undefined");
}
if (! f1()) {
    throw "'this' had incorrect value!";
}
