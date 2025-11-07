// Take a Promise<number> and unwrap it. A Promise<number> resolves to a number,
// so AwaitedNumber is number.
type AwaitedNumber = Awaited<Promise<number>>;

// This is a promise inside another promise. When we unwrap the outer promise,
// we get the inner promise; unwrapping the inner promise gives the string.
// Therefore, AwaitedString is string.
type AwaitedString = Awaited<Promise<Promise<string>>>;

// Awaited checks whether the value is a promise. Here it's just a plain string,
// not a promise, so the type remains string. AwaitedNonPromise is string.
type AwaitedNonPromise = Awaited<string>; // not a promise

// This promise resolves to either a string or a number. Unwrapping it gives
// the value directly, so AwaitedStringOrNumber is string | number.
type AwaitedStringOrNumber = Awaited<Promise<string | number>>;

// This async function returns the number 42. Because it is async,
// the actual return type is Promise<42>.
async function fetchCount() {
  return 42 as const;
}

// ReturnType<typeof fetchCount> is Promise<42>. Awaited<Promise<42>> unwraps it
// and results in 42, so FetchCountResult is 42.
type FetchCountResult = Awaited<ReturnType<typeof fetchCount>>;

let value: FetchCountResult;
value = 42; // OK
// value = 10; => ERROR (because the type is exactly 42)

// Promise.resolve(1) creates a promise that resolves to 1.
// Promise.resolve('x') creates a promise that resolves to 'x'.
// Promise.all([...]) waits for both and returns [1, 'x'].
// Therefore, getData returns Promise<[1, 'x']>.
async function getData() {
  return Promise.all([Promise.resolve(1 as const), Promise.resolve('x' as const)] as const);
}

// ReturnType<typeof getData> is Promise<[1, 'x']>.
// Unwrapping it with Awaited results in [1, 'x'], so GetDataResult is [1, 'x'].
type GetDataResult = Awaited<ReturnType<typeof getData>>; // [1, 'x']

let result: GetDataResult;
result = [1, 'x'];
// result = [1, 'y']; => ERROR (because the type is exactly [1, 'x'])
