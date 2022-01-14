import history from '../@history';
import React from 'react';
import { Router } from 'react-router-dom';
import AppContext from './AppContext';
import routes from './configs/RoutesConfig';
import Layout from './layout/Layout';
import { ApolloProvider } from "@apollo/react-hooks";
import client from './utils/MongodbGraphQLClient'

const App = () => {
	return (
	<ApolloProvider client={client}>
		<AppContext.Provider
			value={{
				routes
			}}
		>
			<Router history={history}>
					<Layout />
			</Router>
		</AppContext.Provider>
	</ApolloProvider>
	)
};

export default App;
