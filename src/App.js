import React, { useState } from "react";
import "./App.css";
import { initializeDB } from "./IDB";
import { v4 as uuid } from "uuid";

function App() {
  const [value, setValue] = useState("");
  const [retriveValue, setRetriveValue] = useState([]);
  const handleInputValue = (e) => {
    setValue(e.target.value);
  };

  const handleSaveValue = async () => {
    let uid = uuid();
    const db = await initializeDB("ToDoData");
    await db.put("data", { id: uid, value }, uid);
    db.close();
  };

  const handleRetriveValue = async () => {
    const db = await initializeDB("ToDoData");
    const retriveDat = await db.getAll("data");
    db.close();
    console.log(retriveDat);
    setRetriveValue(retriveDat);
  };

  const handleDeleteValue = async () => {
    const db = await initializeDB("ToDoData");
  };

  return (
    <div className="App">
      <h1>Indexed DB Practice</h1>
      <div>
        <input type="text" value={value} onChange={handleInputValue} />
        <button onClick={handleSaveValue}>Save in DB</button>
        <button onClick={handleRetriveValue}>Retrive from DB</button>
      </div>
      {retriveValue.map((item) => {
        return (
          <div key={item.id}>
            <ul>
              <li>{item.value}</li>
            </ul>
            <button>Update</button>
            <button onClick={handleDeleteValue}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
