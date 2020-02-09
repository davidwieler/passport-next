import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { GlobalContext } from 'lib/state';

const Index = () => {
	const context = useContext(GlobalContext);
	const {
		state: { userData }
	} = context;

	return (
		<div className="page page-home">
			{!userData || !userData.user ? (
				<div>Homepage stuff</div>
			) : (
				<div>
					Hey {userData.user.name || userData.user.email},
					<br />
					<Link href="/private">
						<a>Private Page Example</a>
					</Link>
					<br />
					<Link href="/protected-example">
						<a>Protected API Route Example</a>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Index;
