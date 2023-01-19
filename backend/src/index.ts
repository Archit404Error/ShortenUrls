import express from "express";
import bodyParser from "body-parser";
import userRouter from "./users/views";
import customerRouter from "./customers/views";
import expressOasGenerator from "express-oas-generator";
import { dbConnect } from "./database";

const app = express();
expressOasGenerator.handleResponses(app, {
  specOutputPath: "swagger.json",
  specOutputFileBehavior: "merge",
  swaggerDocumentOptions: undefined,
});

// Middleware to parse json request bodies
app.use(bodyParser.json());

/**
 * Sub-routers for our main router, we should have one sub-router per "entity" in the application
 */
app.use("/users", userRouter);
app.use("/customers", customerRouter);

/**
 * Some dummy routes to illustrate express syntax
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

expressOasGenerator.handleRequests();

app.listen(process.env.PORT || 3000, async () => {
  console.log("✅ Server is up and running");
  await dbConnect();
});
