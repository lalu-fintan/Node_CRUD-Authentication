const express = require("express");
const validation = require("../middleware/validateTokenHandler");
const {
  getAllContact,
  deleteContact,
  getbyIDContact,
  postContact,
  updateContact,
} = require("../controllers/contactController");

const Router = express.Router();
// Router.use(validation);

Router.get("/contact", getAllContact);
Router.get("/contact", getAllContact);
Router.post("/contact", postContact);
Router.get("/contact/:id", getbyIDContact);
Router.put("/contact/:id", updateContact);
Router.delete("/contact/:id", deleteContact);

module.exports = Router;
