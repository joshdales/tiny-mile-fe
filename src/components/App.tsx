import AppHeader from './AppHeader'
import OrderInfo from './OrderInfo'

import './App.css'

const App: React.FC = () => {
  return (
    <>
      <AppHeader />
      <main>
        <OrderInfo />
      </main>
    </>
  )
}

export default App
