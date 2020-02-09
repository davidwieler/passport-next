import { useContext } from 'react';
import { withRouter } from 'next/router';
import { withAuth } from 'customHooks';

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
						<li>Email: {user.email}</li>
					</>
				)}

				{!user.github && (
					<>
						<div>Not a Github login. Logged in as {user.email}</div>
					</>
				)}
			</ul>
		</div>
	);
};

// Wrap our private page in withRouter and withAuth.
// Any page that has withAuth also requires withRouter.
// withAuth will check the state to see if a user is defined.
// If not, it'll redirect to the login page automatically.

// See ./lib/customHooks/index.js for more information.

export default withRouter(withAuth(Private));
