const express = require('express');
const router = express.Router();

questions = ['put quetsion here']
var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

// TO DO
// prompt for following: 
// VIEWS: View All Departments, View All Roles, View All Employees
// ADD: Add a Department, Add a Role, Add an Employee
// UPDATE: Update an Employee Role


// GET ROUTES

// POST ROUTES

// PUT ROUTES

module.exports = router;