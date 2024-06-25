import express from "express";
import routes from "./routes/routes.js";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());


app.use(cors(
  
));

app.get("/", (req, res) => {
  res.status(500).json({
    message: "Internal Server Error",
    error: error.message,
  });
});

app.use("/api", routes);

app.use(express.static("public"));

export default app;