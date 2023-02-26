import { Router } from "express";
import mongoose from "mongoose";
import LinkController from "./controllers";
import { successJson, errorJson } from "../utils/jsonResponses";
import { verifyToken } from "../utils/authMiddleware";

const linkRouter = Router();

linkRouter.get("/", verifyToken, async (req, res) => {
  res.send(await LinkController.getLinks());
});

linkRouter.get("/getById/:id", verifyToken, async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  res.send(successJson(await LinkController.getLinkById(id)));
});

linkRouter.get("/:shortUrl", async (req, res) => {
  LinkController.getOrigFromShort(req.params.shortUrl)
    .then((origUrl) => res.send(successJson(origUrl)))
    .catch((err) => res.send(errorJson(err)));
});

linkRouter.post("/", verifyToken, async (req, res) => {
  const { shortUrl, origUrl } = req.body;
  res.send(successJson(await LinkController.insertLink(shortUrl, origUrl)));
});

linkRouter.post("/:shortUrl", verifyToken, async (req, res) => {
  const { shortUrl } = req.params;
  const { origUrl } = req.body;
  res.send(successJson(await LinkController.updateLink(shortUrl, origUrl)));
});

linkRouter.put("/:id", verifyToken, async (req, res) => {
  const id = new mongoose.Types.ObjectId(req.params.id);
  const { shortUrl, originalUrl } = req.body;
  res.send(
    successJson(await LinkController.updateById(id, shortUrl, originalUrl))
  );
});

export default linkRouter;
