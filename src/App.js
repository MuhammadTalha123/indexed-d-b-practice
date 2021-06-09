import React, { useState } from "react";
import "./App.css";
import { initializeDB } from "./IDB";
import { v4 as uuid } from "uuid";

function App() {
  const [value, setValue] = useState("");
  const handleInputValue = (e) => {
    setValue(e.target.value);
  };

  const handleSaveValue = async () => {
    const db = await initializeDB("ToDoData");
    await db.put("data", value, uuid());
    db.close();
  };

  return (
    <div className="App">
      <h1>Indexed DB Practice</h1>
      <div>
        <input type="text" value={value} onChange={handleInputValue} />
        <button onClick={handleSaveValue}>Save in DB</button>
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
