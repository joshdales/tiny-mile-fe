import AppHeader from './AppHeader'
import OrderInfo from './OrderInfo'

import './App.css'
import ErrorBoundary from './ErrorBoundary'

const App: React.FC = () => {
  return (
    <>
      <AppHeader />
      <main>
        <ErrorBoundary>
          <OrderInfo />
        </ErrorBoundary>
      </main>
    </>
  )
}

export default App
