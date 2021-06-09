import React, { useEffect, useState } from "react";
import "./App.css";
import { initializeDB } from "./IDB";
import { v4 as uuid } from "uuid";

function App() {
  const [value, setValue] = useState("");
  const [retriveValue, setRetriveValue] = useState([]);
  const [update, setUpdate] = useState(false);
  const [updateKey, setUpdateKey] = useState(null);
  useEffect(() => {
    handleRetriveValue();
  }, []);
  const handleInputValue = (e) => {
    setValue(e.target.value);
  };

  const handleSaveValue = async () => {
    if (update) {
      const db = await initializeDB("ToDoData");
      await db.put("data", { value, updateKey }, updateKey);
      db.close();
      setUpdate(false);
    } else {
      let uid = uuid();
      const db = await initializeDB("ToDoData");
      await db.put("data", { id: uid, value }, uid);
      db.close();
    }
    setValue("");
    window.location.reload();
  };

  const handleRetriveValue = async () => {
    const db = await initializeDB("ToDoData");
    const retriveDat = await db.getAll("data");
    db.close();
    console.log(retriveDat);
    setRetriveValue(retriveDat);
  };

  const handleDeleteValue = async (key) => {
    const db = await initializeDB("ToDoData");
    await db.delete("data", key);
    db.close();
    window.location.reload();
  };

  const handleUpdateValue = async ({ id, value }) => {
    setValue(value);
    setUpdate(true);
    setUpdateKey(id);
  };

  return (
    <div className="App">
      <h1>Indexed DB Practice</h1>
      <div>
        <input type="text" value={value} onChange={handleInputValue} />
        <button onClick={handleSaveValue}>Save in DB</button>
        {/*<button onClick={handleRetriveValue}>Retrive from DB</button>*/}
      </div>
      {retriveValue.map((item) => {
        return (
          <div key={item.id}>
            <ul>
              <li>{item.value}</li>
            </ul>
            <button
              onClick={() => {
                handleUpdateValue(item);
              }}
            >
              Update
            </button>
            <button
              onClick={() => {
                handleDeleteValue(item.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
