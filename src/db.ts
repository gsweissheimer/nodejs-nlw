import mysql from 'mysql2/promise'

if (!process.env.MYSQL_URI) {
	throw new Error("Environment variable MYSQL_URI is not defined");
}

export const pool = mysql.createPool(process.env.MYSQL_URI);
