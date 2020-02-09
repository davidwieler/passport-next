import Link from 'next/link';

const Header = ({ userData }) => {
	return (
		<>
			<nav role="navigation" className="navigation">
				<div className="brand">
					<Link href="/">
						<a>Home</a>
					</Link>
				</div>
				<div className="access">
					{userData.failedAuth ? (
						<div className="login">
							<Link href="/login">
								<a>login</a>
							</Link>
						</div>
					) : (
						<div className="logout">
							<Link href="/api/logout">
								<a>Logout</a>
							</Link>
						</div>
					)}
				</div>
			</nav>
		</>
	);
};

export default Header;
