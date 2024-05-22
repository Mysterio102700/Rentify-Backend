import md5 from "md5";
import pool from "../middlewares/db.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results, fields] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (results.length > 0) {
      const user = results[0];
      const hashedPassword = md5(password);

      if (hashedPassword === user.password) {
        console.log("Login successful");
        res.status(200).json({
          message: "Login successful",
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userType: user.userType,
          },
        });
      } else {
        console.log("Login failed: Incorrect password");
        res.status(401).send("Invalid credentials");
      }
    } else {
      console.log("Login failed: User not found");
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
};

const register = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, userType, password } =
    req.body;

  // Input validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !userType ||
    !password
  ) {
    return res.status(400).send("Please provide all required fields");
  }

  try {
    const [existingUsers, existingUsersFields] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).send("Email is already taken");
    }

    const hashedPassword = md5(password);

    const [results, fields] = await pool.execute(
      "INSERT INTO users (firstName, lastName, email, phoneNumber, userType, password) VALUES (?, ?, ?, ?, ?, ?)",
      [firstName, lastName, email, phoneNumber, userType, hashedPassword]
    );

    console.log("User registered successfully");
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default { login, register };
