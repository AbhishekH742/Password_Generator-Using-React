import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isCharAllowed, setIsCharAllowed] = useState(false);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenarator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefijklmnopqrstuvwxyz";

    if (isNumberAllowed) str += "1234567890";
    if (isCharAllowed) str += "~!@#$%^&*()_+=|?<>";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    // console.log(pass);
    setPassword(pass);
  }, [isNumberAllowed, isCharAllowed, length, setPassword]);

  useEffect(() => {
    passwordGenarator();
  }, [length, isCharAllowed, isNumberAllowed, setPassword]);

  const copyToClipboard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 50);
    window.navigator.clipboard.writeText(password);
  };

  return (
    <>
      <div className="container">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="input-container">
          <input
            type="text"
            className="input"
            placeholder="Password"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button className="copy-btn" onClick={copyToClipboard}>
            Copy
          </button>
        </div>

        <div className="scale">
          <div className="scale-length">
            <input
              type="range"
              name="scale"
              id="length"
              min={6}
              max={50}
              defaultValue={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length ({length})</label>
          </div>
          <div className="number-checkbox flex gap-8">
            <input
              type="checkbox"
              name="number"
              id="Number"
              defaultChecked={isNumberAllowed}
              onChange={() => setIsNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="Number">Number</label>
          </div>
          <div className="char-checkbox flex gap-8">
            <input
              type="checkbox"
              name="char"
              id="Char"
              defaultChecked={isCharAllowed}
              onChange={() => setIsCharAllowed((prev) => !prev)}
            />
            <label htmlFor="Char">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
