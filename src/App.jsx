import { useEffect, useState } from "react";

import { useDispatch } from 'react-redux';
import authService from "./Appwrite/auth";
import { login,logout } from "./Store/authSlice";


function App() {
  
const [loading,setLoading] = useState(true);

const dispatch = useDispatch()

useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    if (userData) {
      dispatch(login({userData}))
    }else{
      dispatch(logout())
    }

  })
  .finally(() => {
    setLoading(false);
  })

// eslint-disable-next-line react-hooks/exhaustive-deps
},[])


 
  return loading ? <div>loading</div>  :(
    <>
      <h1>hello from main page</h1>
    </>
  );
}

export default App;
