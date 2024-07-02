import { FaHtml5 } from "react-icons/fa"
import { CiEdit } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
import SplitPane from "react-split-pane"
import { CiSettings } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa6";
import { FaJsSquare } from "react-icons/fa";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/codepen.svg"
import { AnimatePresence, motion } from "framer-motion";
import UserProfile  from"../components/UserProfile";
import {useSelector} from "react-redux";
import {doc, setDoc} from "firebase/firestore"


export default function NewProject(){
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");
    const [js, setJs] = useState("");
    const [output, setOutput]= useState("");
    const[title, setTitle]= useState("Untitled");
    const[alert, setAlert] = useState(false)


    const [isTitle, setisTitle] = useState("");
    const user = useSelector(state => state.user?.user)

    useEffect (() =>{

        updateOutput()
    },[html, css, js])

    const updateOutput = () =>{
        const combinedOutput = `
        <html>
        <head>
        <style>${css}</style>
        </head>
        <body>
        ${html}
        <script>${js}</script>
        </body> 
        </html>
        `;
        setOutput(combinedOutput);
    }

    const savePrograms = async () =>{
        const id = `${Date.now()}`
        const _doc = {
            id:id,
            title:title,
            html:html,
            css:css,
            js:js,
            output:output,
            user:user
        }
         await setDoc(doc(db, "Projects", id), _doc).then((res) =>{

         }).catch((err) => console.log(err))
    }

   return(
    <>
    <div className="w-screen h-screen flex flex-col items-start justify-start overflow-hidden">
     {/* alert section */}
     <AnimatePresence>
        {alert &&
        <Alert status={"Sucess"} alertMsg={"Project Saved..."}/>
        }
     </AnimatePresence>

    {/* header section */}
    <header className="w-full flex items-center justify-between px-12 py-4">
        <div className="flex items-center justify-center gap-6">
            <Link to={"home/projects"}>
            <img src={Logo} className="w-32 h-auto object-contain"/>
            </Link>
            <div className="flex flex-col items-start justify-start">
                {/* title */}

                <div className="flex items-center justify-center gap-3">
                    <AnimatePresence>
                        {isTitle ? (<>
                        <motion.input 
                        key={"TitleInput"} 
                        type="text" 
                        placeholder="Your Title"
                         value={title} 
                         className="px-3 py-2 rounded-md bg-transparent text-primaryText text-base outline-none border-none"
                         onChange={(e) =>
                            setTitle(e.target.value)
                        }/>
                        </>) : (<>
                        <motion.p key={"titleLabel"} className="px-3 py-2 text-white text-lg ">
                            {title}
                        </motion.p>
                        </>)}
                    </AnimatePresence>

                    <AnimatePresence>
                        {isTitle ? (
                            <><motion.div 
                            key={"CiCircleCheck"} 
                            whileTap={{scale: 0.9}} 
                            className="cursor-pointer" 
                            onClick={() =>setisTitle(false)}>
                                <CiCircleCheck className="text-2xl text-primaryText"/>
                            </motion.div>
                        </>) : (
                            <><motion.div
                             key={" CiEdit"} 
                             whileTap={{scale: 0.9}} 
                             className="cursor-pointer"
                              onClick={() =>setisTitle(true)}>
                                <CiEdit className="text-2xl text-primaryText"/>
                            </motion.div>
                        
                        </>)}
                    </AnimatePresence>
                </div>
                {/* follow */}
                <div className="flex items-center justify-center px-3 -mt-2 gap-2 first-line:">
                    <p className="text-primaryText text-sm">
                        {user?.displayName 
                        ? 
                        user?.displayName : 
                        `${user?.email.split("@") [0]}`}
                        </p>
                        <motion.p 
                        whileTap={{scale: 0.9}}
                        className="text-[10px] bg-emerald-500 rounded-sm px-2 py-[1px] text-primary font-semibold cursor-pointer">
                             + Follow</motion.p>
                </div>
            </div>
        </div>
        {/* user section */}
        {/* {user && ( */}
            <div className="flex items-center justify-center gap-4">
            <motion.button onClick={savePrograms} className="px-6 py-4 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md">
                Save
            </motion.button>
            <UserProfile/>
        </div>
        {/* )} */}
        

    </header>

     {/* coding part */}
     <div>
        <SplitPane
        split="horizontal"
        minSize={100}
        maxSize={-100}
        defaultSize={"50%"}
        >
            {/* Top coding */}
            <SplitPane split="vertical" minSize={500}>
                {/* html code */}
                <div className="w-full h-full flex flex-col items-start justify-start">
                    <div className="w-full flex items-center justify-between">
                        <div className=" bg- px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                            <FaHtml5 className="text-xl text-red-500"/>
                            <p className="text-primaryText font-semibold border-t-gray-500">HTML</p>
                        </div>
                        {/* icons */}
                        <div className="cursor-pointer flex items-center justify-center gap-5 px-4 ">
                            <CiSettings className="text-xl text-primaryText"/>
                            <FaAngleDown className="text-xl text-primaryText"/>

                        </div>
                    </div>
                    <div className="w-full px-2 ">
                    <CodeMirror 
                    value={html}
                     height="600px" 
                     extensions={[javascript({ jsx: true })]}
                     theme={"dark"}
                      onChange={(value, viewUpdate) => {
                        setHtml(value);
                      }} />
                    </div>
                </div>

                <SplitPane split="vertical" minSize={500}>
                    {/* Css code */}
                    <div className="w-full h-full flex flex-col items-start justify-start">
                    <div className="w-full flex items-center justify-between">
                        <div className=" bg- px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                            <FaCss3Alt className="text-xl text-sky-500"/>
                            <p className="text-primaryText font-semibold border-t-gray-500">CSS</p>
                        </div>
                        {/* icons */}
                        <div className="cursor-pointer flex items-center justify-center gap-5 px-4 ">
                            <CiSettings className="text-xl text-primaryText"/>
                            <FaAngleDown className="text-xl text-primaryText"/>

                        </div>
                    </div>
                    <div className="w-full px-2 ">
                    <CodeMirror 
                    value={css}
                     height="600px" 
                     extensions={[javascript({ jsx: true })]}
                     theme={"dark"}
                      onChange={(value, viewUpdate) => {
                        setCss(value);
                      }} />
                    </div>
                </div>

                    {/* js code */}
                    <div className="w-full h-full flex flex-col items-start justify-start">
                    <div className="w-full flex items-center justify-between">
                        <div className=" bg- px-4 py-2 border-t-4 flex items-center justify-center gap-3">
                            <FaJsSquare className="text-xl text-yellow-500"/>
                            <p className="text-primaryText font-semibold border-t-gray-500">JS</p>
                        </div>
                        {/* icons */}
                        <div className="cursor-pointer flex items-center justify-center gap-5 px-4 ">
                            <CiSettings className="text-xl text-primaryText"/>
                            <FaAngleDown className="text-xl text-primaryText"/>

                        </div>
                    </div>
                    <div className="w-full px-2 ">
                    <CodeMirror 
                    value={js}
                     height="600px" 
                     extensions={[javascript({ jsx: true })]}
                     theme={"dark"}
                      onChange={(value, viewUpdate) => {
                        setJs(value);
                      }} />
                    </div>
                </div>

                </SplitPane>

            </SplitPane>


            {/* bottom coding*/}
            <div className="bg-white text-black" style={{overflow: "hidden", height:"100%"}}>
                <iframe
                title="Result"
                srcDoc={output}
                style={{border: "none", width:"100%", height:"100%"}}
                />

            </div>


        </SplitPane>

    </div>
 </div>
    </>

   ) 
}