const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String
  },
  desc: {
    type: String
  },
  imgSrc: {
    type: String
  },
  link: {
    type: String
  }
});

const dbProjects = new mongoose.model("project", projectSchema);

module.exports = dbProjects;