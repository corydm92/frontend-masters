import type { ComponentPropsWithoutRef } from 'react';

export const Button = (props: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      {...props}
      className="bg-primary-400 hover:bg-primary-500 rounded px-4 py-2 font-bold text-white"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
