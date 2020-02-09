import { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import { GlobalContext } from 'lib/state';
import dynamic from 'next/dynamic';

const LoginPage = dynamic(() => import('../../pages/login'));

export const withAuth = (AuthComponent) => (props) => {
	const context = useContext(GlobalContext);
	const { state } = context;
	const userData = state.userData;

	useEffect(() => {
		if (userData) {
			if (userData && !userData.failedAuth) return; // do nothing if the user is logged in
			Router.replace(props.router.asPath, userData.redirectTo, { shallow: true });
		}
	}, [userData]);

	if (!userData) {
		return null;
	}

	if (userData.failedAuth || userData.status === 401) return <LoginPage />;

	return <AuthComponent {...props} />;
};
