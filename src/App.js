import React, { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const handleInputValue = (e) => {
    setValue(e.target.value);
  };



  return (
    <div className="App">
      <h1>Indexed DB Practice</h1>
      <div>
        <input type="text" value={value} onChange={handleInputValue} />
        <button>Save in DB</button>
        <button>Retrive from DB</button>
      </div>
      <div>
        <ul>
          <li>item</li>
        </ul>
        <button>Update</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default App;
