import React, { useRef, useState, useCallback, useEffect } from "react";
import { IoMdCopy } from "react-icons/io";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characters, setCharacters] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characters) str += "!@#$%^&*()-_+={}[]|;'<,>.?/~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characters]);

  const copyPasswordtoclipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password, length]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characters, passwordGenerator]);

  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md p-4 rounded-lg bg-white text-black-500">
        <h1 className="text-black text-center mb-4">PASSWORD GENERATOR</h1>
        <div className="flex items-center gap-x-2">
          <input
            type="text"
            value={password}
            className="rounded font-light pl-2 border-2 w-[220px]"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordtoclipBoard}
            className="w-16 h-7 bg-slate-500 rounded text-white flex justify-center items-center gap-x-1"
          >
            <IoMdCopy />
            Copy
          </button>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
        </div>

        <div className="flex justify-start mt-2 gap-2">
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={characters}
              onChange={() => setCharacters((prev) => !prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
