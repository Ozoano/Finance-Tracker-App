import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// const mongoURI: string = process.env.mongoURI

mongoose
  .connect("")
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Running on Port ${port}`);
    });
  })
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/api/financial", financialRecordRouter);

// Finance123
