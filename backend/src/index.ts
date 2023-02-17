import express from "express";
import bodyParser from "body-parser";
import linkRouter from "./links/views";
import swaggerUI from "swagger-ui-express";
import spec from "../api-spec.json";
import { dbConnect } from "./database";

const app = express();

// Middleware to parse json request bodies
app.use(bodyParser.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(spec));

/**
 * Sub-routers for our main router, we should have one sub-router per "entity" in the application
 */
app.use("/links", linkRouter);

app.listen(process.env.PORT || 3000, async () => {
  console.log("✅ Server is up and running");
  await dbConnect();
});
