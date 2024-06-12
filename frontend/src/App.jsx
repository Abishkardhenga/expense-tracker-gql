import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import NotFoundPage from "./Pages/NotFoundPage";
import TransactionPage from "./Pages/TransactionPage";
import Header from "./components/Ui/Header";

export default function App() {
  const authUser = true ; 
  return (
   <>
   {authUser && <Header/>}
   <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<SignupPage/>}/>
    <Route path="/transaction/:id" element={<TransactionPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
   </Routes>
  {/* <Footer/>? */}
   </>
  )
}