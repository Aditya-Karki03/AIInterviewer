import Database from "better-sqlite3";

//initialize an object
const db = new Database("data.db");

//Table creation
export const userTableCmd = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`;

export default db;
