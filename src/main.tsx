import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {ToastContainer} from 'react-toastify';
import {App} from './App';
import 'react-toastify/dist/ReactToastify.css';
import './main.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ToastContainer autoClose={8000} pauseOnHover={true} />
		<App />
	</StrictMode>,
);
