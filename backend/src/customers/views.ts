import { Router } from "express";
import mongoose from "mongoose";
import CustomerController from "./controllers";
import { successJson, errorJson } from "../utils/jsonResponses";

const customerRouter = Router();

customerRouter.get("/", async (req, res) => {
  res.send(await CustomerController.getCustomers());
});

customerRouter.get("/:id", async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  res.send(await CustomerController.getCustomerById(id));
});

customerRouter.post("/resetAges", async (req, res) => {
  const numResets = await CustomerController.resetAges();
  res.send(successJson(numResets));
});

export default customerRouter;
