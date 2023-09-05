import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConn.js";
import router from "./routes/route.js";
import errHandle from "./middleware/errorHandler.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.use("/api", router);

app.use(errHandle.notFound);
app.use(errHandle.errorHandler);

connectDB()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server Connected :${PORT}`);
      });
    } catch (error) {
      console.log("Server not connected");
    }
  })
  .catch((err) => {
    console.log("Invalid database connection");
  });



// problems in app controllers