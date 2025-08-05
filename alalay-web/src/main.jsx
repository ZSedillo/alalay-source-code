// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// ✅ Add these two imports
import { Provider } from 'react-redux';
import store from './_store/store'; // adjust path if needed

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* ✅ Wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>
);
