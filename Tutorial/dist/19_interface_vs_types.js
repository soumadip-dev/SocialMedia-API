"use strict";
// interface: used for object shapes that you expect to extend and merge later
// Supports declaration merging (can be 'reopened' and extended later)
// The 'Box1' type now includes both 'width: number' and 'height?: number'
const boxDemo = { width: 10, height: 20 };
// ERROR: Type aliases CANNOT be redeclared with the same name.
// This would result in a TypeScript error: 'Duplicated identifier 'Bag'.'
// type Bag = { weight: number };
