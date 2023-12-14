import './App.css'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainDashboard from './layout/routes/dashboard/MainDashboard'
import { storeSlice } from './app/storeSlice'

function App() {

  return (
    <Provider store={storeSlice}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path='/' element={<MainDashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
