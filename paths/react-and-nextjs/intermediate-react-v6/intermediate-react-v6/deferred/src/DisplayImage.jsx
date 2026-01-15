import { memo, useRef } from 'react';
import img from '../images/luna.jpg';

const JANK_DELAY = 100;

export default function DisplayImage({ filterStyle }) {
	console.log('display image');

	const expensiveRender = () => {
		const start = performance.now();
		while (performance.now() - start < JANK_DELAY) {}
		return null;
	};

	return (
		<>
			{expensiveRender()}
			<img
				src={img}
				alt='Luna'
				style={{ filter: filterStyle }}
			/>
			<p>Last render: {Date.now()}</p>
		</>
	);
}

export const MemoTest = memo(function MemoTest({ stableDependency }) {
	console.log('here');
	const ref = useRef(0);
	ref.current = ref.current + 1;
	return (
		<>
			Dependency: {stableDependency} - Memo Test Render Count: {ref.current}
		</>
	);
});
