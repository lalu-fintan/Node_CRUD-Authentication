const asyncHandler = require("express-async-handler");
const contact = require("../models/contactModel");

const getAllContact = asyncHandler(async (req, res) => {
  const contacts = await contact.find();
  res.status(200).json({ contacts });
});

const getbyIDContact = asyncHandler(async (req, res) => {
  const contacts = await contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contacts);
});

const postContact = asyncHandler(async (req, res) => {
  console.log("res", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are manditory");
  }
  const contacts = await contact.create({
    name,
    email,
    phone,
  });
  res.status(200).json(contacts);
});

const updateContact = asyncHandler(async (req, res) => {
  const contacts = await contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContacts = await contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContacts);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contacts = await contact.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const deleteContact = await contact.findByIdAndRemove(
    req.params.id,
    req.body
  );
  res.status(200).json(deleteContact);
});

module.exports = {
  getAllContact,
  getbyIDContact,
  postContact,
  updateContact,
  deleteContact,
};
