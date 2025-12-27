import { AsyncDatabase } from 'promised-sqlite3';

const OPEN_AI_SECRET = process.env.OPEN_AI_SECRET;

async function getWhoAmI() {
	const db = await AsyncDatabase.open('./notes.db');
	return db.get('SELECT * FROM users where id = ?', [1]);
}

export default async function WhoAmI() {
	const user = await getWhoAmI();

	return (
		<div>
			<h1>Who am I?</h1>
			<p>
				You are {user.name} and your id is {user.id}
			</p>
		</div>
	);
}
