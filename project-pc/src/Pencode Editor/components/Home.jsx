import { useState } from "react"
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link, Route } from "react-router-dom";
import Logo from "../assets/codepen.svg"
import { IoIosHome } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Project from "./Project";
import { useSelector } from "react-redux";
import UserProfile from "./UserProfile";


export default function Home(){
    const [sidemenu, setisMenu] = useState(false)
    const user = useSelector(state => state.user?.user)
    return(
        <>
        {/* left side */}
        <div className={`w-2 ${sidemenu ? "w-2": "flex-[.2] xl:flex-[.2]"} min-h-screen max-h-screen
         relative bg-secondary py-3 py-6 flex flex-col items-center justify-start gap-4 transition-all du  ease-in-out`}>
            <div onClick={() => setisMenu(!sidemenu)} className=" w-8 h-8 bg-transparent rounded-br-lg rounded-tr-lg absolute -right-6 flex items-center justify-center cursor-pointer">
                <FaArrowAltCircleLeft className="text-white text-xl"/>
                </div>

                {/* logo */}
                <div className="overflow-hidden w-full flex flex-col gap-4">
                    <Link to={"/home"}>
                <img src={Logo} alt="" /></Link>

                <Link to={"/newProjects"}>
                <div className="px-6 py-3 flex items-center justify-center rounded-xl border border-gray-400 cursor-pointer group hover:border-gray-200">
                <p className="text-gray-400 group-hover:text-gray-200 caption-bottom">Start coding</p>
                </div>
                </Link>

                {/* home */}
                {user && (
                <Link to={"home/projects"} className="flex items-center justify-center gap-6">
                <IoIosHome className="bg-white text-xl"/>
                </Link>
            )}
            </div>
            </div>

        {/* right side */}
        <div className="flex-1 min-h-screen max-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start px-4 md:px-12 py-4 md:py-12">
            {/* top section */}
            <div className="w-full flex items-center justify-between gap-3">
                <div className= "bg-secondary w-full px-4 py-3 rounded-md flex items-center justify-center gap-3">
                    <CiSearch className="text-2xl text-white"/>
                    <input type="text" className="flex-1 px-4 py-1 text-xl bg-transparent outline-none border-none text-white  placeholder:text-gray-600 "  placeholder="Search here..."/>
                </div>

                {!user && (
                    <div className="flex items-start justify-center gap-3">
                        <Link to={"/home/auth"} className="bg-emerald-500 px-6 py-2 rounded-md text-white text-lg cursor-pointer hover:bg-emerald-700">
                        SignUp
                        </Link>
                    </div>
                    
                )}
                {user && <UserProfile/>}
                </div>

                {/* bottom section */}
                <div className="w-full">
                    <Routes>
                        <Route path="/*" element={<Project/>}/>
                        <Route path="/auth" element={<SignUp/>}/>

                    </Routes>
                </div>

        </div>
        </>
        
    )
}