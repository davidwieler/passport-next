import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the initial context
export const GlobalContext = React.createContext();

// Create the context consumer
export const GlobalContextConsumer = GlobalContext.Consumer;

export const GlobalProvider = (props) => {
	const [userData, setUserData] = useState(null);

	// This is the stuff we want to fire on initial app load.
	// Be careful here, as this only happens once
	// DO NOT ADD ANYTHING TO THE RETURNED ARRAY...
	// otherwise the entire state will reload.
	useEffect(() => {
		// Check for debug flag in URL
		console.log('app state test');
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				state: {
					userData
				},
				actions: { setUserData }
			}}
		>
			{props.children}
		</GlobalContext.Provider>
	);
};

GlobalProvider.propTypes = {
	children: PropTypes.node
};
