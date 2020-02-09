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
					<Link href="/private">
						<a>Hey {userData.user.name || userData.user.email}</a>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Index;
