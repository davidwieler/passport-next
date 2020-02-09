import React, { useEffect, useContext } from 'react';
import App from 'next/app';
import dynamic from 'next/dynamic';
import { fetchWithCreds } from 'lib/fetch';
import 'styles/global.scss';
import Link from 'next/link';

import { GlobalProvider, GlobalContext } from 'lib/state';

const Header = dynamic(() => import('components/header'));
const Footer = dynamic(() => import('components/footer'));

const AppContainer = ({ children, userData, router }) => {
	const context = useContext(GlobalContext);
	const { state, actions } = context;

	useEffect(() => {
		if (userData && !state.userData) {
			console.log('updating user data', userData);
			actions.setUserData(userData);
		}
	}, [userData]);

	return (
		<>
			<Header userData={userData} />
			<div className="layout">{children}</div>
			<Footer />
		</>
	);
};

AppContainer.getInitialProps = async ({ req }) => {
	const userData = await fetchWithCreds(req, 'http://localhost:3000/api/user');
	return { userData };
};

const Main = ({ appProps: { userData }, Component, pageProps, router }) => {
	if (!userData) {
		return null;
	}

	return (
		<main className={`main ${!userData.failedAuth ? 'logged-in' : ''}`}>
			<Component {...pageProps} />
		</main>
	);
};

export default class extends App {
	static async getInitialProps({ Component, ctx }) {
		// Call the page's `getInitialProps` if it exists. Don't `await` it yet,
		// because we'd rather `await` them together concurrently.
		const pagePropsTask = Component.getInitialProps ? Component.getInitialProps(ctx) : {};

		// Call the container's `getInitialProps` if it exists. Don't `await` it yet,
		// because we'd rather `await` them together concurrently.
		const appContainerTask = AppContainer.getInitialProps ? AppContainer.getInitialProps(ctx) : { userData: { failedAuth: true } };

		// Both tasks are running concurrently, now await them both.
		const [pageProps, appProps] = await Promise.all([pagePropsTask, appContainerTask]);

		return { pageProps, appProps };
	}

	render = () => {
		const { Component, pageProps, appProps, router } = this.props;

		return (
			<GlobalProvider>
				<AppContainer {...appProps} router={router}>
					<Main Component={Component} pageProps={pageProps} appProps={appProps} router={router} />
				</AppContainer>
			</GlobalProvider>
		);
	};
}
