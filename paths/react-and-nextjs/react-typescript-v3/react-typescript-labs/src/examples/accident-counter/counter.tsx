import React, { useState, type Dispatch, type SetStateAction } from 'react';
import { Card } from '$/common/components/card';
import { Button } from './button';

type CounterControlsProps = {
  setCount: Dispatch<SetStateAction<number>>;
};

type CounterFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

const CounterControls = ({ setCount }: CounterControlsProps) => {
  return (
    <div className="flex gap-2">
      <Button onClick={() => setCount((prev) => prev - 1)}>➖ Decrement</Button>
      <Button onClick={() => setCount(0)}>🔁 Reset</Button>
      <Button onClick={() => setCount((prev) => prev + 1)}>➕ Increment</Button>
    </div>
  );
};

const CounterForm = ({ onSubmit }: CounterFormProps) => {
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
  const [count, setCount] = useState(0);

  const handleCounterFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const inputValue = Number(new FormData(e.currentTarget).get('input-count'));

    setCount(inputValue);
  };

  return (
    <Card className="border-primary-500 flex w-2/3 flex-col items-center gap-8">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p>

      <CounterControls setCount={setCount} />
      <CounterForm onSubmit={handleCounterFormSubmit} />
    </Card>
  );
};
