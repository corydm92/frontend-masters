import React, { useState, useReducer, type ComponentPropsWithoutRef } from 'react';
import { Card } from '$/common/components/card';
import { Button } from './button';
import { counterReducer, initialState } from './counter-reducer';

type CounterControlsProps = {
  onDecrement: () => void;
  onReset: () => void;
  onIncrement: () => void;
};

const CounterControls = ({ onDecrement, onReset, onIncrement }: CounterControlsProps) => {
  return (
    <div className="flex gap-2">
      <Button onClick={onDecrement}>➖ Decrement</Button>
      <Button onClick={onReset}>🔁 Reset</Button>
      <Button onClick={onIncrement}>➕ Increment</Button>
    </div>
  );
};

const CounterForm = ({ onSubmit }: ComponentPropsWithoutRef<'form'>) => {
  const [draftCount, setDraftCount] = useState(0);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDraftCount(e.target.valueAsNumber);
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

  dispatch({ type: 'decrement' });

  const setCount = (value: number) => dispatch({ type: 'setCount', payload: value });
  const increment = () => dispatch({ type: 'increment' });
  const decrement = () => dispatch({ type: 'decrement' });

  const handleCounterFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const inputValue = Number(new FormData(e.currentTarget).get('input-count'));

    setCount(inputValue);
  };

  return (
    <Card className="border-primary-500 flex w-2/3 flex-col items-center gap-8">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p>

      <CounterControls
        onDecrement={decrement}
        onReset={() => setCount(0)}
        onIncrement={increment}
      />
      <CounterForm onSubmit={handleCounterFormSubmit} />
    </Card>
  );
};
