import { Route, Routes } from 'react-router-dom'

// components
import Home from './component/Home'
import PayConfirmation from './component/PayConfirmation'

function App () {
  return (
    <Routes>
      <Route exact path='/payment-confirmation' element={<PayConfirmation />} />
      <Route exact path='/' element={<Home />} />
      <Route exact path='*' element={<Home />} />
    </Routes>
  )
}

export default App
