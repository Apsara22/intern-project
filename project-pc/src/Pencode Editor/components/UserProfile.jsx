import { useSelector } from "react-redux"
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Menus } from "../utils/helper";
import {signoutAction} from "../utils/helper"
import { useState } from "react";
import { AnimatePresence } from "framer-motion"
import { slideUpOut } from "../Animation";


export default function UserProfile(){
const user = useSelector((state) => state.user?.user);
const [isMenu, setIsMenu] = useState(false)

    return(
      <div className="flex items-center justify-center gap-4 relative">
        <div className="h-14 w-14 flex items-center justify-center rounded-xl overflow-hidden cursor-pointer bg-emerald-500 ">
          {
            user?.photoURL ?<>
            <img src={user?.photoURL} alt={user?.displayName} referrerPolicy="no-referrer" className="w-full h-full object-cover"/>
             </>: <p className="text-xl text-white font-semibold capitalize">
              {user?.email[0]}
              </p>
          }
        </div>
        <div onClick={() => setIsMenu(!isMenu)} className="p-4 rounded-md flex items-center justify-center bg-secondary cursor-pointer">
          <FaChevronDown className="text-purple-50"/>
          </div>
          <AnimatePresence>
            {
              isMenu &&(
                <div
                {...slideUpOut} className="bg-secondary absolute top-16 right-0 px-4 py-3 rounded-xl shadow-md z-10 flex flex-col items-start justify-start gap-4 min-w-[225px]">
            {Menus && Menus.map(menu => (
              <Link to={menu.uri} 
              key={menu.id}
              className="text-purple-200 text-lg hover:bg-[rgba(256,256,256,0.5)] px-2 py-1 w-full rounded-md">
                {menu.name}
              </Link>

            ))}
            <p onClick={signoutAction}  className="text-purple-200 text-lg hover:bg-[rgba(256,256,256,0.5)] px-2 py-1 w-full rounded-md">
              SignOut</p>
          </div>
              )
            }
          </AnimatePresence>
        </div>  
    )
}