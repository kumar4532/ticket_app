import React from "react"
import Home from "./pages/home/Home"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import SignUp from "./pages/signup/SignUp"
import Admin from "./pages/admin/Admin"
import Invoice from "./pages/invoice/Invoice"
import {Toaster} from "react-hot-toast"
import { useAuthContext } from "./context/AuthContext"

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="p-4 h-screen">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={authUser ? <Navigate to={"/"} /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to={"/"} /> : <SignUp />} />
          <Route path="/admin" element={authUser ? <Admin /> : <Login />} />
          <Route path="/invoice" element={authUser ? <Invoice /> : <Login />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App;