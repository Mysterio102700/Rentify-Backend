import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12708420",
  password: "rss7eslbIV",
  database: "sql12708420",
});

async function createUsersTable() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(100) NOT NULL,
      phoneNumber VARCHAR(20) NOT NULL,
      userType VARCHAR(20) NOT NULL,
      password VARCHAR(255) NOT NULL
  
      );


    `);
    connection.release();
    console.log("Table 'users' created successfully");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}
createUsersTable();

export default pool;
