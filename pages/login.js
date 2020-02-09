import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

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

		if (res.failedAuth) {
			setLoginError(res.errorMessage);
		}

		if (res.status === 409) {
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
			Router.push('/private');
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
					<label for="login-ue">Username/Email</label>
					<input name="email" type="text" id="login-ue" placeholder="Username or Email" />

					<label for="login-password">Password</label>
					<input name="password" type="password" id="login-password" placeholder="Password" />

					<button>Login</button>
					{loginError}
				</form>
			</div>

			<div className="form-wrapper">
				<h2>Or Sign Up</h2>
				<form onSubmit={handleRegisterSubmit}>
					<label for="register-ue">Username/Email</label>
					<input name="email" type="text" id="register-ue" placeholder="Username or Email" />

					<label for="register-password">Password</label>
					<input name="password" type="password" id="register-password" placeholder="Password" />

					<button>Sign Up</button>
					{registrationError}
				</form>
			</div>
		</div>
	);
};

export default Login;
