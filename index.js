import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userController from "./Controllers/userController.js";


const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).send({ error: "Invalid JSON" });
  } else {
    next();
  }
});

app.use(cors());

// Routes
router.post("/register", userController.register);
router.post("/login", userController.login);


app.use(router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
