import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('app-main')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
