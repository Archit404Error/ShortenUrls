import express from "express";
import bodyParser from "body-parser";
import userRouter from "./users/views";

const app = express();
app.use(bodyParser.json());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("✅ Server is up and running");
});
