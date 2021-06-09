import { openDB, deleteDB } from "idb";

export const initializeDB = async (dbName) => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      // Create a store of objects
      db.createObjectStore("data");
      // Create an index on the 'date' property of the objects.
      // storeRow.createIndex("number", "number");
    },
  });
  return db;
};
