import express, { Router } from "express";
import Name from "../models/Name.js";

const namesRouter = Router();

namesRouter.get("/", async (req, res) => {
  const names = await Name.find({});
  res.json(names);
});

namesRouter.post("/", async (req, res) => {
  const { name } = req.body;
  const newName = new Name({ name });
  const savedName = await newName.save();

  res.json(savedName);
});

namesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const name = await Name.findByIdAndDelete(id);

  if (!name) {
    return res.status(500).json({ error: "Something went wrong" });
  }

  return res.status(204).end();
});

export default namesRouter;
