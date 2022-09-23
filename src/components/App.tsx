import AppHeader from './AppHeader'
import DeliveryJobInfo from './DeliveryJobInfo'

import './App.css'
import ErrorBoundary from './ErrorBoundary'

const App: React.FC = () => {
  return (
    <>
      <AppHeader />

      <main>
        <ErrorBoundary>
          <DeliveryJobInfo />
        </ErrorBoundary>
      </main>
    </>
  )
}

export default App
