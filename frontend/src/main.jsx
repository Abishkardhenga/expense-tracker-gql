import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import GridBackground from './components/Ui/GridBackGround.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
<GridBackground>

				<App />
</GridBackground>
		</BrowserRouter>)
