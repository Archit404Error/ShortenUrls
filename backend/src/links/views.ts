import { Router } from "express";
import mongoose from "mongoose";
import LinkController from "./controllers";
import { successJson, errorJson } from "../utils/jsonResponses";

const linkRouter = Router();

linkRouter.get("/", async (req, res) => {
  res.send(await LinkController.getLinks());
});

linkRouter.get("/getById/:id", async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  res.send(successJson(await LinkController.getLinkById(id)));
});

linkRouter.get("/:shortUrl", async (req, res) => {
  LinkController.getOrigFromShort(req.params.shortUrl)
    .then((origUrl) => res.send(successJson(origUrl)))
    .catch((err) => res.send(errorJson(err)));
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
