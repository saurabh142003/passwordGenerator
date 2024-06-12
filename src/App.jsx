import { useCallback, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './index.css';
function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [password , setPassword] = useState("");
  const [bgColor,setBgColor] = useState("bg-sky-400");

  const passSetter = useCallback(() => {
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = '';

    if(numberAllowed) str+="1234567890";
 
    if(charAllowed) str+="@#$%^&*!~";
   

    for(let i=1;i<=length;i++){
      let random = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(random);
    }
    setPassword(pass);


  }, [numberAllowed, charAllowed, length,setPassword])
  useEffect(() => {
    passSetter();
  }, [numberAllowed, charAllowed, length,passSetter]);

  const copyPasswordToClipboard = () => {
    // passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password).then(()=>{
      setBgColor("bg-sky-900")
      setTimeout(() => {
        setBgColor("bg-sky-500")
      }, 1000);
      
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }
  return (
    <>
    <div className="w-full h-full bg-black text-white px-4 py-4 flex flex-col items-center content-center gap-5">
      <div className="flex items-center content-center mt-6  px-4 py-4 w-1/2 bg-slate-700">
        <input className="rounded-tl-md rounded-bl-md px-3 py-3 w-full text-black" type="text" value={password} maxLength="100" minLength="8" readOnly/>
        <button onClick={copyPasswordToClipboard} className={`${bgColor} rounded-tr-md rounded-br-md px-3 py-3`}>COPY</button>
      </div>
      <div className="flex gap-6 w-1/2 px-4 py-4 bg-slate-700">
        <div className="flex gap-2 ml-3 w-1/3">
        <input type="range" min={6} max={100} value={length} onChange={(e)=> setLength(e.target.value)}/>
        <label htmlFor="">Length {length}</label>
        </div>
        <div className="ml-3">
          <input type="checkbox" defaultChecked={numberAllowed} onChange={()=>{
            setNumberAllowed((prev)=> !prev)
            }}/>
          <label htmlFor="">Numbers</label>
        </div>
        <div className="ml-3">
          <input type="checkbox" defaultChecked={charAllowed} onChange={()=>{
            setCharAllowed((prev)=> !prev)
          }}/>
          <label htmlFor="">Special Characters</label>
        </div>
        

      </div>
    </div>
    
    </>
  )
}

export default App
