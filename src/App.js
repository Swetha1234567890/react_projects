import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css';

function App() {
  const [length, setlength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const pwdRef = useRef(null)

  const pwdgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str +='0123456789';
    if (charAllowed) str += '!@#$%^&*(){}[]';
    for(let i=1; i<=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() => {
    pwdRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    pwdgenerator()
  }, [length, numAllowed, charAllowed, pwdgenerator])

  return (
    <div className="app">
      <div className='container'>
        <h1 className='heading'>Password Generator</h1>
        <div className='top-container'>
          <input type='text' placeholder='password' className='input' value={password} ref={pwdRef}/>
          <button className='button' onClick={copyPassword}>Copy</button>
        </div>
        <div className='bottom'>
          <input type='range' min={6} max={100} value={length} id='ranger' onChange={(e) => setlength(e.target.value)}/>
          <label htmlFor='ranger' className='text'>length: {length}</label>
          <input type='checkbox' id='numInput' defaultChecked={numAllowed} onChange={() => {setNumAllowed((prev) => !prev)}}/>
          <label className='text' htmlFor='numInput'>Number</label>
          <input type='checkbox' id='charInput' defaultChecked={charAllowed} onChange={() => {setCharAllowed((prev) => !prev)}}/>
          <label className='text' htmlFor='charInput'>Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
