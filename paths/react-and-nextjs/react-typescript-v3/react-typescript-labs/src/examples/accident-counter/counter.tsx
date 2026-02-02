import React, { useState, useReducer, type ActionDispatch } from 'react';
import { Card } from '$/common/components/card';
import { Button } from './button';
import { counterReducer, initialState, type CounterAction } from './counter-reducer';

type DispatchCountAction = ActionDispatch<[action: CounterAction]>;

const CounterControls = ({ dispatch }: { dispatch: DispatchCountAction }) => {
  const onReset = () => dispatch({ type: 'setCount', payload: 0 });
  const onIncrement = () => dispatch({ type: 'increment' });
  const onDecrement = () => dispatch({ type: 'decrement' });

  return (
    <div className="flex gap-2">
      <Button onClick={onDecrement}>➖ Decrement</Button>
      <Button onClick={onReset}>🔁 Reset</Button>
      <Button onClick={onIncrement}>➕ Increment</Button>
    </div>
  );
};

const CounterForm = ({ dispatch }: { dispatch: DispatchCountAction }) => {
  const [draftCount, setDraftCount] = useState(0);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDraftCount(e.target.valueAsNumber);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const inputValue = Number(new FormData(e.currentTarget).get('input-count'));

    dispatch({ type: 'setCount', payload: inputValue });
  };

  return (
    <form className="flex items-center gap-2" onSubmit={onSubmit}>
      <input
        className="ring-primary-600 focus:border-primary-800 rounded border border-slate-500 px-4 py-2 outline-none focus:ring-2"
        type="number"
        name="input-count"
        onChange={handleChange}
        value={draftCount}
      />

      <Button>Update Counter</Button>
    </form>
  );
};

export const Counter = () => {
  const [{ count }, dispatch] = useReducer(counterReducer, initialState);

  return (
    <Card className="border-primary-500 flex w-2/3 flex-col items-center gap-8">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p>

      <CounterControls dispatch={dispatch} />
      <CounterForm dispatch={dispatch} />
    </Card>
  );
};
