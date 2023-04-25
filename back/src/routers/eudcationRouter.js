const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/portfolio", {
  useNewUrlParser: true,
});

// Define the schema for the Education MVP
const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  field: String,
  startYear: Number,
  endYear: Number,
  description: String,
});

// Define the schema for the Project MVP
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  startYear: Number,
  endYear: Number,
  technologies: [String],
});

// Define the models for the Education MVP and Project MVP
const Education = mongoose.model("Education", educationSchema);
const Project = mongoose.model("Project", projectSchema);

// Router for the Education MVP
router
  .route("/education")
  // Get all education records
  .get((req, res) => {
    Education.find((err, education) => {
      if (err) {
        console.log(err);
      } else {
        res.json(education);
      }
    });
  })
  // Add a new education record
  .post((req, res) => {
    const newEducation = new Education({
      school: req.body.school,
      degree: req.body.degree,
      field: req.body.field,
      startYear: req.body.startYear,
      endYear: req.body.endYear,
      description: req.body.description,
    });
    newEducation.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Education record added successfully!");
      }
    });
  })
  // Update an existing education record
  .put((req, res) => {
    Education.findOneAndUpdate(
      { _id: req.body.id },
      {
        school: req.body.school,
        degree: req.body.degree,
        field: req.body.field,
        startYear: req.body.startYear,
        endYear: req.body.endYear,
        description: req.body.description,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Education record updated successfully!");
        }
      }
    );
  });

// Router for the Project MVP
router
  .route("/project")
  // Get all project records
  .get((req, res) => {
    Project.find((err, project) => {
      if (err) {
        console.log(err);
      } else {
        res.json(project);
      }
    });
  })
  // Add a new project record
  .post((req, res) => {
    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      startYear: req.body.startYear,
      endYear: req.body.endYear,
      technologies: req.body.technologies,
    });
    newProject.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Project record added successfully!");
      }
    });
  })
  // Update an existing project record
  .put((req, res) => {
    Project.findOneAndUpdate(
      { _id: req.body.id },
      {
        title: req.body.title,
        description: req.body.description,
        startYear: req.body.startYear,
        endYear: req.body.endYear,
        technologies: req.body.technologies,
      },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Project record updated successfully!");
        }
      }
    );
  });

module.exports = router;
