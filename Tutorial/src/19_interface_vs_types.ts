// interface: used for object shapes that you expect to extend and merge later
// Supports declaration merging (can be 'reopened' and extended later)

// type alias: used for more general types (primitives, objects, enums,
// intersections, unions, functions, etc.)
// Cannot be reopened or extended via merging
// Type aliases are generally more flexible for complex type operations

interface Box1 {
  width: number;
}
// Interfaces support declaration merging. This second declaration is merged
// with the first 'Box1' interface, effectively adding the 'height' property.
interface Box1 {
  height?: number;
}

// The 'Box1' type now includes both 'width: number' and 'height?: number'
const boxDemo: Box1 = { width: 10, height: 20 };

type Bag = { size: number };
// ERROR: Type aliases CANNOT be redeclared with the same name.
// This would result in a TypeScript error: 'Duplicated identifier 'Bag'.'
// type Bag = { weight: number };
