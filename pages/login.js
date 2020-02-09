import React, { useState } from 'react';
import Link from 'next/link';

const Login = () => {
	const [loginError, setLoginError] = useState(false);
	const [registrationError, setRegistrationError] = useState(false);

	const handleRegisterSubmit = async (event) => {
		setLoginError(false);
		setRegistrationError(false);

		event.preventDefault();

		// Persist the React synthetic event because we want to
		// forward it to handleLoginSubmit upon successful registration
		event.persist();

		const data = new FormData(event.target);

		const formatData = new URLSearchParams(data);

		const response = await fetch('/api/register', {
			method: 'POST',
			body: formatData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		});

		const res = await response.json();

		if (res.failedAuth || res.status === 409) {
			setRegistrationError(res.errorMessage);
		}

		if (res.status === 200) {
			handleLoginSubmit(event);
		}
	};

	const handleLoginSubmit = async (event) => {
		setLoginError(false);
		setRegistrationError(false);

		event.preventDefault();

		const data = new FormData(event.target);
		const formatData = new URLSearchParams(data);

		const response = await fetch('/api/auth/local', {
			method: 'POST',
			body: formatData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
		});

		const res = await response.json();

		if (res.failedAuth) {
			setLoginError(res.errorMessage);
		}

		if (res.status === 200) {
			// Do a hard page redirect to the success login url
			window.location.pathname = process.env.loginSuccessURL;
		}
	};

	return (
		<div className="page page-login">
			<div className="form-wrapper">
				<h2>GitHub</h2>
				<Link href="/api/auth/github">
					<a>Login with GitHub</a>
				</Link>
			</div>

			<div className="form-wrapper">
				<h2>Login</h2>
				<form onSubmit={handleLoginSubmit}>
					<label htmlFor="login-ue">Username/Email</label>
					<input name="email" type="text" id="login-ue" placeholder="Username or Email" />

					<label htmlFor="login-password">Password</label>
					<input name="password" type="password" id="login-password" placeholder="Password" />

					<button>Login</button>
					{loginError && <div className="error">{loginError}</div>}
				</form>
			</div>

			<div className="form-wrapper">
				<h2>Or Sign Up</h2>
				<form onSubmit={handleRegisterSubmit}>
					<label htmlFor="register-ue">Username/Email</label>
					<input name="email" type="text" id="register-ue" placeholder="Username or Email" />

					<label htmlFor="register-password">Password</label>
					<input name="password" type="password" id="register-password" placeholder="Password" />

					<button>Sign Up</button>
					{registrationError && <div className="error">{registrationError}</div>}
				</form>
			</div>
		</div>
	);
};

export default Login;
