// Exclude<U, V>    => Remove from U the members assignable to V
// Extract<U, V>    => Keep from U the members assignable to V

type EventType1 = 'click' | 'scroll' | 'mousemove' | 'keydown' | 'keyup';

type MouseEventTypes = Exclude<EventType1, 'keydown' | 'keyup'>;
type KeyboardEventTypes = Extract<EventType1, 'keydown' | 'keyup'>;

function handleMouseEvent(event: MouseEventTypes) {
  console.log(event);
}

function handleKeyboardEvent(event: KeyboardEventTypes) {
  console.log(event);
}

handleMouseEvent('mousemove');
// handleMouseEvent('keyup'); => error because keyup is not assignable to MouseEventTypes
handleKeyboardEvent('keydown');

type MayBeNumber = number | null | undefined;
type CleanNumber = NonNullable<MayBeNumber>;

const abcNum: CleanNumber = 123;
// const abcNum2: CleanNumber = null; => error because null is not assignable to CleanNumber
const abcNum2: MayBeNumber = null;
