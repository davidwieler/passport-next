import { fetchWithCreds } from 'lib/fetch';
import Link from 'next/link';
// This is an example of using a basic page with getInitialProps,
// and a protected route.

// See pages/api/protected-route.js for more information.
const User = ({ failedAuth, protectedData }) => {
	if (!failedAuth) {
		console.log('protectedData', protectedData);
	}

	return (
		<div className="page page-user">
			{failedAuth && (
				<>
					<Link href="/login">
						<a> login</a>
					</Link>
				</>
			)}

			{!failedAuth && <>Check the console for the initial props in "protectedData"</>}
		</div>
	);
};

User.getInitialProps = async ({ req }) => {
	const profileData = await fetchWithCreds(req, 'http://localhost:3000/api/protected-route');
	return { ...profileData };
};

export default User;
