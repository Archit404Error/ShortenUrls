import { Router } from "express";
import mongoose from "mongoose";
import LinkController from "./controllers";
import { successJson, errorJson } from "../utils/jsonResponses";

const linkRouter = Router();

linkRouter.get("/", async (req, res) => {
  res.send(await LinkController.getLinks());
});

linkRouter.get("/:id", async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  res.send(successJson(await LinkController.getLinkById(id)));
});

linkRouter.post("/", async (req, res) => {
  const { shortUrl, origUrl } = req.body;
  res.send(successJson(await LinkController.insertLink(shortUrl, origUrl)));
});

linkRouter.post("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const { origUrl } = req.body;
  res.send(successJson(await LinkController.updateLink(shortUrl, origUrl)));
});

export default linkRouter;
