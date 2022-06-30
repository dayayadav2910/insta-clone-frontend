import Navbar from './components/Navbar';
import { BrowserRouter, Route, Router, Routes,useNavigate } from "react-router-dom"
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import SignUp from './components/screens/SignUp';
import Profile from './components/screens/Profile';
import AddPost from './components/screens/AddPost';
import { createContext, useEffect, useReducer, useContext} from 'react';
import {reducer, initial} from './reducers/userReducer'


export const UserContext =  createContext()


const Routing=()=>{
  const history = useNavigate();
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"))
      if(user){
        dispatch({type: "USER",payload:user})
      }
      else{
        history("/login")
      }
  }, [])
  
  return(
    <>
    <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route exact path="/login" element={<Login></Login>}></Route>
        <Route exact path="/signup" element={<SignUp></SignUp>} ></Route>
        <Route exact path="/profile" element={<Profile></Profile>}></Route>
      </Routes>
      </>
  )
}

function App() {
  
  const [state, dispatch] = useReducer(reducer, initial)
  return (
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
      <Navbar></Navbar>
        <Routing></Routing>
        
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
