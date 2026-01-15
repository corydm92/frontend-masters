'use client';
import updateUsername from './updateUsername';
import { useContext } from 'react';
import { AppContext } from '@/app/context/Providers';

export default function ClientWhoAmIPage({ children, id }) {
	const ctx = useContext(AppContext);

	console.log(ctx);

	return (
		<div>
			{children}
			<form action={updateUsername}>
				<h2>Enter new username</h2>
				<input
					type='text'
					name='username'
					placeholder='username'
				/>
				<input
					type='hidden'
					name='id'
					value={id}
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}
