import { useState } from 'react';
import { Card } from '$/common/components/card';
import { Button } from './button';

export const Counter = () => {
  const [count, setCount] = useState(0);

  const handleDecrement = () => setCount((prev) => prev - 1);
  const handleReset = () => setCount(0);
  const handleIncrement = () => setCount((prev) => prev + 1);

  return (
    <Card className="border-primary-500 flex w-2/3 flex-col items-center gap-8">
      <h1>Days Since the Last Accident</h1>
      <p className="text-6xl">{count}</p>
      <div className="flex gap-2">
        <Button onClick={handleDecrement}>➖ Decrement</Button>
        <Button onClick={handleReset}>🔁 Reset</Button>
        <Button onClick={handleIncrement}>➕ Increment</Button>
      </div>
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const input = new FormData(e.currentTarget).get('input-count');
          setCount(Number(input));
        }}
      >
        <input
          className="ring-primary-600 focus:border-primary-800 rounded border border-slate-500 px-4 py-2 outline-none focus:ring-2"
          type="number"
          name="input-count"
        />
        <Button>Update Counter</Button>
      </form>
    </Card>
  );
};
