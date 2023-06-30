import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const database = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    port: process.env.DB_PORT
}

const conectarDB = async () => {
    try {
        const cxn = await mysql.createConnection(database)
        return cxn;
    }catch(e){
        console.log(e)
    }
}

export default conectarDB; 