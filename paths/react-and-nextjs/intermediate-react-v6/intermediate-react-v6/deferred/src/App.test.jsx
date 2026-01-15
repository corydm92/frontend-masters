import { render, fireEvent } from '@testing-library/react';
import App from './App';
import { expect, test } from 'vitest';

test('changes values on input and button click', async () => {
	const screen = render(<App />);
});
