import mongoose from "mongoose";

import { Link, LinkModel } from "./models";

/**
 * Finds all link docs in DB
 * @returns promise with all link docs or error
 */
const getLinks = async () => LinkModel.find({});

/**
 * Finds a link doc by id
 * @param id link id
 * @returns promise with customer doc or error
 */
const getLinkById = async (id: mongoose.Types.ObjectId) =>
  LinkModel.find({ _id: id });

/**
 * Finds the original link of a shortUrl
 * @param shortUrl the shortened url
 * @returns promise with original link or error
 */
const getOrigFromShort = async (shortUrl: string) => {
  const res = await LinkModel.findOne({ shortUrl: shortUrl });
  if (!res) throw new Error("No link found");
  return res.originalUrl;
};

/**
 * Updates the originalLink of a shortUrl in DB
 * @param shortUrl shortUrl
 * @param newUrl new orig url
 * @returns promise with original link doc or error
 */
const updateLink = async (shortUrl: string, newUrl: string) =>
  LinkModel.findOneAndUpdate({ shortUrl: shortUrl }, { origUrl: newUrl });

/**
 * Updates a link by id
 * @param id link id
 * @param newShort new short url
 * @param newOrig new original url
 * @returns promise with updated link doc or error
 */
const updateById = async (
  id: mongoose.Types.ObjectId,
  newShort: string,
  newOrig: string
) =>
  LinkModel.updateOne(
    { _id: id },
    { shortUrl: newShort, originalUrl: newOrig }
  );

/**
 * Inserts new link into DB
 * @param shortUrl alias url
 * @param origUrl url pointed to
 * @returns promise with new link doc or error
 */
const insertLink = async (shortUrl: string, origUrl: string) =>
  LinkModel.create(new Link(shortUrl, origUrl));

export default {
  getLinks,
  getLinkById,
  getOrigFromShort,
  updateLink,
  updateById,
  insertLink,
};
