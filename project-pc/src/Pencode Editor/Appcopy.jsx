
import { useEffect, useState} from "react";
import Home from "./components/Home";
import Notfound from "./Notfound";
import Rootlayout from "./Rootlayout";
import { auth,db } from "./config/firebase-config";
import {doc, setDoc} from "firebase/firestore"
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from "react-router-dom";
import Spinner from "./components/Spinner";
import { useDispatch } from "react-redux";
import {SET_USER} from "./context/action/userAction"
import NewProject from "./container/NewProject";


function App(){
  const[isLoading, setIsLoding]=useState(false)
  const dispatch = useDispatch()


  useEffect (()=> {
    const unsubscribe = auth.onAuthStateChanged( (userCred) =>{
      if(userCred){
        console.log(userCred?.providerData[0]);
        setDoc(doc(db,"users", userCred?.uid), userCred ?.providerData[0])
        .then(() =>{
           //dispatch the store
           dispatch(SET_USER(userCred ?.providerData[0]));
           useNavigate("/home/projects",{replace :true})
        })
      }
      else
      useNavigate("/home/auth",{replace :true})

      
    
    setInterval(() => {
      setIsLoding(false);
}, 1000);
    
  })

    //clean up the listener
    return () => unsubscribe();
  },[])
 

  
  const router = createBrowserRouter([
    {
      path: "",
      element: <Rootlayout/>,
      children:[
        {
          path: "/home/*",
          element: <Home/>
            },
            {
              path: "*",
              element: <Notfound/>
                },
                {
                  path: "/newProjects",
                  element: <NewProject/>
                    },
                
                    
                

                    
           ] } ])
               
   
 
  return(
    <>
    {isLoading ? (<div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <Spinner/>
    </div>) :(
      
      <div className="w-screen h-screen flex items-start justify-start overflow-hidden "> 
       <RouterProvider router={router} /></div>
      
    )}
    </>
  );

}
export default App