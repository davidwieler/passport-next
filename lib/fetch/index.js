import fetch from 'isomorphic-unfetch';

export const fetchWithCreds = async (req, route, post = false) => {
	let Cookie;

	if (req) {
		Cookie = req.headers.cookie;
	} else {
		Cookie = '';
	}

	const response = await fetch(route, {
		credentials: 'include',
		headers: { Cookie }
	});

	const data = await response.json();

	return data;
};
