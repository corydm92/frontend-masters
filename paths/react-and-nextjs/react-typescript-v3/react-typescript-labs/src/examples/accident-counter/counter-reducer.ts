export const initialState = {
  count: 0,
};

type Action = {
  type: string;
  payload: unknown;
};

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

export type CounterAction = IncrementAction | DecrementAction | SetCountAction;

// Improvement: Define a proper Action type instead of using 'any'.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const counterReducer = (state = initialState, action: CounterAction): { count: number } => {
  console.log({ action });
  const { count } = state;

  switch (action.type) {
    case 'increment':
      return { count: count + 1 };
    case 'decrement':
      return { count: count - 1 };
    case 'setCount':
      return { count: action.payload };
  }
};
