import { useState, useEffect, useTransition } from 'react';
import Score from './Score';
import getScore from './getScore';

export default function App() {
	const [isPending, startTransition] = useTransition();
	const [game, setGame] = useState(1);
	const [score, setScore] = useState({ home: '-', away: '-' });

	async function getNewScore(game) {
		setGame(game);
		startTransition(async () => {
			const newScore = await getScore(game);
			startTransition(() => {
				setScore((prev) => {
					console.log(prev);
					return newScore;
				});
			});
		});
	}

	useEffect(() => {
		console.log('useEffect');
		getNewScore(game);
	}, [game]);

	const generateOptions = (number) => {
		const arr = [];

		for (let i = 1; i < number + 1; i++)
			arr.push(
				<option
					value={i}
					key={i}>
					Game {i}
				</option>
			);

		return arr;
	};

	return (
		<div className='app'>
			<h1>Game {game}</h1>
			<select onChange={(e) => getNewScore(e.target.value)}>
				{generateOptions(7)}
			</select>
			<div className={`loading-container ${isPending ? 'loading' : ''}`}>
				<span className='spinner'>🏀</span>
			</div>
			<div>
				<Score
					isPending={isPending}
					homeImage={score.homeImage}
					homeName={score.homeName}
					awayImage={score.awayImage}
					awayName={score.awayName}
					home={score.home}
					away={score.away}
				/>
			</div>
		</div>
	);
}
