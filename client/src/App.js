import './App.css';
import React , {useEffect, createContext , useReducer , useContext} from 'react';
import Navbar from "./components/Navbar"; 
import {BrowserRouter , Route, Switch, useHistory} from "react-router-dom"
import Home from "./components/screens/Home"
import Signin from "./components/screens/Signin"
import Profile from "./components/screens/Profile"
import Signup from "./components/screens/Signup"
import CreatePost from "./components/screens/CreatePost"
import {reducer ,initialState  } from "./reducers/userReducer"

export const UserContext = createContext()

const Routing =()=>{
  const history = useHistory()
  const {state , dispatch} = useContext(UserContext)
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER" , payload:user})
      history.push("/")
    }else{
      history.push("/signin")
    }

  },[])
  return (
    
    <>
    <Switch>
    <Route exact path="/"><Home></Home></Route>
    <Route path="/signin"><Signin></Signin></Route>
    <Route path="/signup"><Signup></Signup></Route>
    <Route path="/profile"><Profile></Profile></Route>
    <Route path="/create"><CreatePost></CreatePost></Route>
    </Switch>
    </>
  )
}


function App() {
  const [ state , dispatch] = useReducer(reducer , initialState)

  return (
    <UserContext.Provider value={{state:state , dispatch:dispatch}}>
       <BrowserRouter>
    <Navbar></Navbar>
    <Routing></Routing>
    </BrowserRouter>
    </UserContext.Provider>
    )
}

export default App;
