import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { motion } from "framer-motion";

export default function UserAuthIn(
    {label,
         placeholder,
          isPass,
           key, 
           setStateFunction,
           Icon,
           setgetEmailValid
        }){
    const[value, setValue] = useState("");
    const[showPass, setshowPass] = useState(false);
    const[isEmailValid, setEmailValid] = useState(false);

    const handleTextChange = (e) =>{
        setValue(e.target.value)
        setStateFunction(e.target.value)

        if(placeholder === "Email"){
            const emailRegx = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
            const status = emailRegx.test(value);
            setEmailValid(status);
            setgetEmailValid(status);
        }
    }
    return(
        <div className="flex flex-col items-start justify-start">
            <label className="text-sm text-gray-300">{label}</label>
            <div className={`flex items-center justify-center gap-3 w-full md:w-96 rounded-md px-4 bg-gray-200
            ${!isEmailValid && placeholder ==="Email" &&
                value.length > 0 && 
                "border-2 border-red-500"
            }`}>
                <Icon className="text-text555 text-2xl"/>
                <input 
                type={isPass && showPass ? "password" : "text"} 
                 placeholder={placeholder} 
                 className="flex-1 w-full py-2 outline-none border-none bg-transparent text-text555 text-lg" 
                value={value} 
                onChange={handleTextChange}
                />
                {isPass && (
                    <div onClick={()=>setshowPass(!showPass) } className="cursor-pointer">
                        {showPass ? (
                    <FaEye className="text-text-555 "/>
                ):
                (
                    <FaEyeSlash className="text-text-555 "/>

                )}

                </div>
                )}
                


            </div>
        </div>
    )
}