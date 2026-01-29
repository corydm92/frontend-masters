# useState type Saftey

## Types

The goal is not to type everything in our app, only to add hardness where hardness is needed.

If all goes well, we shouldn't be needing to write that much TypeScript.

If typescript can figure out what the return type is on its own, you dont have to say anything.

If typescript cannot infer what the type is, it will type it as any. We avoid this at all costs.

- We can use default values to enforce typing, at the cost of making fields required

Strict mode enforces no implicit any, strictNullChecks, noImplicitThis, and others

Hovering to see types is great for checking return types or default types, feel free to memorize everything but it can become taxing

## Types vs Interfaces

Difference is increasingly little

Biggest difference is when extending, interfaces can extend where types can not.

- Types can use intersection
- Interfaces can extend types

Nuance is when you want to override, you cannot override fields with interface but you can when you use type intersection

Rule is: As much typescript as we need and as little as we can get away with

## Typing Children Exercise

React.ReactNode is the catch all for any return type (string, number, element, etc)

PropsWithChildren is another useful type thats worded well for generic implementation

- Does make it optional, if children are needed we need to type it as a property in its own type `({children: ReactNode})`

If we need to extend or implement, we can do that too `({children}: PropsWithChildren<{width: number}>)`

## Typing useState

using generics will mix in with the default value, so useState<number>() will be number | undefined

To get rid of undefined we must initialize state with a value, otherwise it must be undefined as that is how its initialized.

# Event and Form Types

## Typing Events

When typing state updates, we must use Dispatch (the type for useState and useReducer) with SetStateAction (type for functional set state arguments)

`ex: {"setStateValue": Dispatch<SetStateValue<number>>}`

## Button Props

ComponentPropsWithoutRef<'form' | 'button' | 'input' ...etc>

Great utility type for defining all the props an intrinsic element would take without having to define them ourselves. Gives us typed onSubmit, defaultValue, etc.

## Creating a Button Component Exercise

Use JSDoc to define not only a type, but the attributes of the type. This leads to better documentation especially for a design system

# State Management

## Unions and Template Literal Types

Unions are sepcific options, think OR operator.
'loading | 'error' | 'success'
number | string | boolean

You can use template strings as types aswell

useState<`rgb(${number}, ${number}, ${number}`)>('rgb(1, 2, 3)')

Keep in mind if you get too tricky trying to perfect these (preventing adding a negative to this instance), the farther down the rabit hole you go the more difficult the TSC will be to manage

These are better for bringing a little bit of information, like making sure theres a # for a hex code. We can always do prop checking inside the component for validation.

crypto.randomUUID() is a cool way to add IDs with a browser api

- Think list of records without unique ID's

We think of typescript as a way to add soft validation guards with definitive paramter structures. Its powerful for making sure you pass the right stuff, but the nitty gritty content checking is better done in JS.

## Typing Reducer Actions

Dont use any, if there is truly an unknown value or shape (like an API response we cant guarantee at build time), we use unknown.

When you use typeof or instanceof checks on an unknown value within a conditional block, TypeScript automatically narrows the type within that block. For example, if you check typeof payload === 'string', TypeScript knows the value is a string inside that block. Similarly, if you return early when a value is a string, TypeScript knows it must be a number for the rest of the function.

## Descrimintated Unions

A discriminated union is a union of object types that all share a common literal field (the discriminant), like type, so TypeScript can narrow based on that field.

- A “literal field” means the value is a specific literal, not a broad type.
- Literal: "red", "blue", "small", 42, true
- Not literal: string, number, boolean

So this works as a discriminant:

type Item =
| { color: "red"; size: "small" }
| { color: "blue"; size: "large" };

But this does not discriminate:
type Item =
| { color: string; size: string }
| { color: string; size: string };

Because both variants have the same broad types, TS can’t narrow.

EX:

type Item =
| { color: string; size: string }
| { color: string; size: string };

interface IncrementAction extends Action {
type: 'increment';
}

interface DecrementAction extends Action {
type: 'decrement';
}

interface SetCountAction extends Action {
type: 'set-count';
payload: number;
}

export type CounterAction = IncrementAction | DecrementAction | SetCountAction

Using the never type gives us the ability to ensure that value isnt passed in.

So if we have a base type that is extended and modified by other types, then used in a descriminated union where everything is fairly unique at this point but shares the same ancestor, this is a good option.

type Action = {
type: string;
payload: unknown;
}

interface IncrementAction extends Action {
type: 'increment';
payload: never;
}

interface DecrementAction extends Action {
type: 'decrement';
payload: never;
}

interface SetCountAction extends Action {
type: 'setCount';
payload: number;
}

export type CounterAction = IncrementAction | DecrementAction | SetCountAction

### Switch type

When iterating over a set number of types, using switch/case lets typescript know once all possible options are being returned

If you have a return type defined and do each condition over a descriminated literal, it will give type security below but unless you explicitly return a value at the end it will leave it open as possible void.

Switch case gets around this by making everything below the switch unreachable
