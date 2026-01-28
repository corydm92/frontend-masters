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
