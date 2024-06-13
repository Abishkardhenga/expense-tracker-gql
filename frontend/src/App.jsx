import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import NotFoundPage from "./Pages/NotFoundPage";
import TransactionPage from "./Pages/TransactionPage";
import Header from "./components/Ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import  { Toaster} from "react-hot-toast"

export default function App() {
  const authUser = true ; 

const { loading , data, error} = useQuery(GET_AUTHENTICATED_USER)
console.log("loading", loading)
console.log("data", data)
console.log("error", error)

  return (
   <>
   {data?.authUser && <Header/>}
   <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/signup" element={<SignupPage/>}/>
    <Route path="/transaction/:id" element={<TransactionPage/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
   </Routes>
  {/* <Footer/>? */}

  <Toaster/>
   </>
  )
}