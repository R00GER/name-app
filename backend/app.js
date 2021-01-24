import express, { json } from "express";
import mongoose from "mongoose";
import namesRouter from "./controllers/names.js";

const app = express();
mongoose
  .connect(
    "mongodb+srv://dbuser:dbuserforsolita@cluster0.cjc0f.mongodb.net/solita-names?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err, "error connecting to db");
  });

app.use(json());
app.use("/", namesRouter);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
