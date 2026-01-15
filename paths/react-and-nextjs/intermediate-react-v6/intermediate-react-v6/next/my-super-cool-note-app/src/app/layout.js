import Link from 'next/link';
import 'doodle.css/doodle.css';
import './globals.css';
import Providers from '@/app/context/Providers';

export const metadata = {
	title: 'Note Passer',
	description: 'Example App for Frontend Masters',
};

export default async function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className='doodle'>
				<Providers>
					<nav>
						<h1>
							<Link href='/'>Note Passer</Link>
						</h1>
					</nav>
					{children}
				</Providers>
			</body>
		</html>
	);
}
