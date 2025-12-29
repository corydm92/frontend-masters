'use client';

import { createContext } from 'react';

export const AppContext = createContext('foo');

export default function Providers({ children }) {
	return <AppContext value='bar'>{children}</AppContext>;
}
