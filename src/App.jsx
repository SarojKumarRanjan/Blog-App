import { useEffect, useState } from "react";

import { useDispatch } from 'react-redux';
import authService from "./Appwrite/auth";
import { login,logout } from "./Store/authSlice";
import { Outlet } from "react-router-dom";
import  Header  from "./components/Header/Header";
import Footer  from "./components/Footer/Footer"
import Shimmer from "./utils/Shimmer";



function App() {
  
const [loading,setLoading] = useState(true);

const dispatch = useDispatch()

useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    if (userData) {
      dispatch(login(userData))
    }else{
      dispatch(logout())
    }

  })
  .finally(() => {
    setLoading(false);
  })

// eslint-disable-next-line react-hooks/exhaustive-deps
},[])


 
  return loading ? <Shimmer/>  :(
    <>
    <Header/>
    
      <Outlet/>
      <Footer/>
      
      
    </>
  );
}

export default App;
