import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import GridBackground from './components/Ui/GridBackGround.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
	credentials: "include"
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<GridBackground>
			<ApolloProvider client={client}>

				<App />
			</ApolloProvider>
		</GridBackground>
	</BrowserRouter>)
