import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

declare global {
  interface Window {
    env: {
      VITE_REACT_APP_USE_FAKER: boolean
    }
  }
}

// Set the environment variable
window.env = {
  VITE_REACT_APP_USE_FAKER: import.meta.env.VITE_REACT_APP_USE_FAKER 
}

console.log(import.meta.env.VITE_REACT_APP_USE_FAKER)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)