import { useState, useCallback, useEffect, useRef } from "react";
import { UilCopy, UilSync } from "@iconscout/react-unicons";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isNumbersAllowed, setNumbersAllowed] = useState(false);
  const [isCharactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("password");

  // useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumbersAllowed) str += "0123456789";
    if (isCharactersAllowed) str += "~!@#$%^&*()_+}{[]?<>;";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, isNumbersAllowed, isCharactersAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, isNumbersAllowed, isCharactersAllowed, passwordGenerator]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3 text-4xl mb-6">
          Password Generator
        </h1>
        <div className="flex justify-center w-4/5 shadow rounded-lg overflow-hidden m-2">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="text-black outline-none w-full px-3 py-2 font-medium text-xl text-center"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-black text-white px-5 py-0.5 shrink-0 font-semibold"
            id="btn"
          >
            <UilCopy id="copy-btn" />
          </button>

          <button
            onClick={passwordGenerator}
            className="outline-none bg-black text-white px-5 py-0.5 shrink-0 font-semibold"
          >
            <UilSync />
          </button>
        </div>

        <div className="flex flex-wrap gap-5 text-xl justify-center my-6 grow">
          <label className="flex gap-2 justify-center items-center">
            <input
              type="range"
              min={4}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />{" "}
            Length:{length}
          </label>

          <label htmlFor="Num">
            <input
              type="checkbox"
              defaultChecked={isNumbersAllowed}
              id="Num"
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
            />{" "}
            Numbers
          </label>

          <label htmlFor="Char">
            <input
              type="checkbox"
              id="Char"
              defaultChecked={isCharactersAllowed}
              onChange={() => {
                setCharactersAllowed((prev) => !prev);
              }}
            />{" "}
            Characters
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
