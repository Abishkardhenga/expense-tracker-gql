import { Navigate, Route, Routes } from "react-router-dom";
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

const { loading , data, error} = useQuery(GET_AUTHENTICATED_USER)
console.log("loading", loading)
console.log("data", data)
console.log("error", error)
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;

  return (
   <>
   {data?.authUser && <Header/>}
   <Routes>
    <Route path="/" element={data?.authUser?<HomePage/>:<Navigate to="/login"/>}/>
    <Route path="/login" element={!data?.authUser?<LoginPage/>:<Navigate to="/"/>}/>
    <Route path="/signup" element={!data?.authUser?<SignupPage/>:<Navigate to = "/"/>}/>
    <Route path="/transaction/:id" element={data?.authUser?<TransactionPage/>:<Navigate to="/"/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
   </Routes>
  {/* <Footer/>? */}

  <Toaster/>
   </>
  )
}