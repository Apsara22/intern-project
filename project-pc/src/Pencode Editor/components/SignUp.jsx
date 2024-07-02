import { useState } from "react"
// import {AnimatePresence} from "react-router-dom"
import Icon from "../assets/codepen.svg"
import UserAuthIn from "../componentsall/UserAuthIn"
import { MdMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { signINWithGoogle } from "../utils/helper";
import { signINWithGitHub } from "../utils/helper";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase-config";
// import { FadeInOut } from "../Animation";

export default function SignUp(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[getEmailValidationStatus, setgetEmailValid] = useState(false)
    const[isLogin, setisLogin] = useState(false);
    const [alert, setAlert]= useState(false)
    const[alertMsg, setalertMsg]= useState("");


    const createNewUser = async() => {
        if(getEmailValidationStatus){
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCred) =>{
                if(userCred){
                    console.log(userCred);
                }
            })
            .catch((err) => console.log(err));
        }
    };
    const loginWithEmailPassword = async() =>{
        if(getEmailValidationStatus){
            await signInWithEmailAndPassword(auth, email, password)
            .then((userCred) =>{
                if(userCred){
                    console.log(userCred);
                }
            })
            .catch((err) =>{
                console.log(err.message);
                if(err.message.includes("user-not-found")){
                    setAlert(true);
                    setalertMsg("Inavalid Id : User Not found")
                }
                else if(err.message.includes("wrong-password")){
                    setAlert(true)
                    setalertMsg("Invalid Passowrd")
                }
                else{
                    setAlert(true);
                    setalertMsg("temporality disable due to may failed login");
                }
                setInterval(() =>{
                    setAlert(false);
                },4000)
            });
        }
    }

    return(
        <>
        <div className="w-full py-6">
            <img src={Icon} alt="" className="object-contain w-32 opacity-50 h-auto"/>

            <div className="w-full flex  flex-col items-center justify-center py-8">
                <p className="py-12 text-2xl text-primary text-yellow-100">Join with US!🙂</p>
                
                <div className="px-8 w-full md:w-auto py-4 rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center gap-8">
                    {/* login or sign of box with email, password, login btn */}
                    {/* create props */}
                    <UserAuthIn 
                    label="Email"
                     placeholder="Email" 
                     isPass={false}
                      key="Email"
                       setStateFunction={setEmail}
                        Icon={MdMail}
                        setgetEmailValid={setgetEmailValid}/>

                    {/* password */}
                    <UserAuthIn 
                    label="Password" 
                    placeholder="Password"
                     isPass={true}
                      key="Password"
                       setStateFunction={setPassword} 
                       Icon={MdPassword}/>

                       {/* alert Section */}
                       {/* <AnimatePresence>
                        {alert && (
                       <p key={"Alert Message"} {...FadeInOut} className="text-red-500">
                        {alertMsg}
                        </p>
)}
                       </AnimatePresence> */}

                       {/* Login Section */}
                       {!isLogin ?
                       (<div onClick={createNewUser} className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500">
                       <p className="text-xl text-white">SignUp</p> 
                       </div>) : 
                       (<div  onClick={loginWithEmailPassword} className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-emerald-400 cursor-pointer bg-emerald-500">
                       <p className="text-xl text-white">Login</p> 
                       </div>)}

                       {!isLogin ? (
                        <p className="text-white">Already Have an account!{""} &nbsp; <span onClick={()=> setisLogin(!isLogin)} className="text-emerald-500 cursor-pointer">Login Here</span></p>
                    ) :( 
                        <p className="text-white">Don't Have an account!{""} &nbsp; <span  onClick={()=> setisLogin(!isLogin)} className="text-emerald-500 cursor-pointer">Create Here</span></p>
                    )}

                    {/* Or Section */}
                    <div className="flex items-center gap-12">
                        <div className="(h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
                        <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
                        <div className="(h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
                    </div>

                    {/* Google login */}
                    <div onClick={signINWithGoogle} className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop:blur-md py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer">
                        <FaGoogle className="text-3xl "/>
                        <p className="text-xl text-white"> Sign in with Google</p>
                    </div>

                     {/* Or Section */}
                     <div className="flex items-center gap-12">
                        <div className="(h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
                        <p className="text-sm text-[rgba(256,256,256,0.2)]">OR</p>
                        <div className="(h-[1px] bg-[rgba(256,256,256,0.2)] rounded-md w-24"></div>
                    </div>

                    {/* Github login */}

                    <div onClick={signINWithGitHub} className="flex items-center justify-center gap-3 bg-[rgba(256,256,256,0.2)] backdrop:blur-md py-3 rounded-xl hover:bg-[rgba(256,256,256,0.4)] cursor-pointer">
                        <FaGithub className="text-3xl "/>
                        <p className="text-xl text-white"> Sign in with Github</p>
                    </div>



                       </div>

            </div>
        </div>
        </>

        
    )

}