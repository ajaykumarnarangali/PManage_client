import { Route, Routes } from "react-router-dom"

import Register from "./pages/Register"
import Login from './pages/Login'
import Home from './pages/Home'
import ProtectedRoute from './routes/ProtectedRoute'
import ProductPage from "./pages/ProductPage"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
