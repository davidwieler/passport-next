import { useEffect, useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { withAuth } from 'customHooks';
import Link from 'next/link';

// Testing markdown stuff
import marked from 'marked';

import { GlobalContext } from 'lib/state';

const Private = (props) => {
	const context = useContext(GlobalContext);
	const { state } = context;
	const user = state.userData.user;

	return (
		<div className="page page-private">
			<ul>
				{user.github && (
					<>
						<li>
							<img src={user.github.avatar} />
						</li>
						<li>Github ID: {user.github.id}</li>
						<li>Name: {user.name}</li>
					</>
				)}

				<li>Email: {user.email}</li>
			</ul>
		</div>
	);
};

export default withRouter(withAuth(Private));
