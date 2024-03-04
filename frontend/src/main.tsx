import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Aleo"></link>
    <App />
  </React.StrictMode>,
)
