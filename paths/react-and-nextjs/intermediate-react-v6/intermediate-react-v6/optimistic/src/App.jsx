import { useState, useEffect, useOptimistic, useTransition } from 'react';

export default function App() {
	const [thoughts, setThoughts] = useState([]);
	const [thought, setThought] = useState('');
	const [isPending, startTransition] = useTransition();
	const [optimisticThoughts, addOptimisticThought] = useOptimistic(
		thoughts,
		(state, newValue) => {
			return [newValue, ...state];
		}
	);

	async function postDeepThought(formData) {
		console.log(formData);
		setThought('');
		startTransition(async () => {
			addOptimisticThought(`${thought} (Loading...)`);

			const response = await fetch('/thoughts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ thought }),
			});

			if (!response.ok) {
				alert('This thoguht was not deep enough. Do better.');
				return;
			}

			console.log('ok');

			const { thoughts: newThoughts } = await response.json();
			setThoughts(newThoughts.slice(0, 5));
		});
	}

	useEffect(() => {
		fetch('/thoughts')
			.then((res) => res.json())
			.then((data) => setThoughts(data.slice(0, 5)));
	}, []);

	return (
		<div className='app'>
			<h1>Deep Thoughts</h1>
			<form
				// action={postDeepThought}
				onSubmit={(e) => {
					e.preventDefault();
					postDeepThought();
				}}>
				<label htmlFor='thought'>Whats on your mind?</label>
				<textarea
					name='thought'
					id='thought'
					rows='5'
					cols='33'
					value={thought}
					onChange={(e) => setThought(e.target.value)}
				/>
				<button type='submit'>Direct my thoughts to the aether</button>
			</form>
			<ul>
				{optimisticThoughts.map((thought, index) => (
					<li key={index}>{thought}</li>
				))}
			</ul>
		</div>
	);
}
