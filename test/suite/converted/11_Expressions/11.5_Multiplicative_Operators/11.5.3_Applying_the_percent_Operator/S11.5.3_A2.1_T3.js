// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x % y uses GetValue
 *
 * @id: S11.5.3_A2.1_T3;
 * @section: 11.5.3;
 * @description: If GetBase(y) is null, throw ReferenceError;
 */

//CHECK#1
try {
  1 % y;
  $ERROR('#1.1: 1 % y throw ReferenceError. Actual: ' + (1 % y));  
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#1.2: 1 % y throw ReferenceError. Actual: ' + (e));  
  }
}
