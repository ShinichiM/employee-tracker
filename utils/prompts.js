const express = require('express');

const choices = ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit'];
var inquirer = require('inquirer');
const Query = require('../db/queries');
const query = new Query();

class Prompts {
  constructor() {
    this.option = ''
  }
  
  viewDepartments() {
    query.getAllDepartments().then(() => this.initiateQuestion());
  };

  viewRoles() {
    query.getAllRoles();

  };

  viewEmployees() {
    query.getAllEmployees();

  }

  addDepartment() {

  };

  addEmployee() {

  };

  addRole() {
    query.addRole();
  };

  updateEmployee() {

  };

  initiateQuestion() {
    return inquirer.prompt([
      {
        type: 'checkbox',
        name: 'option',
        message: 'What would you like to do?',
        choices: choices
      }
    ]).then(({ option })  => {
      this.option = option[0];

      if (!option[0]) {
        console.log('You did not select an option. Please try again.');
        process.exit();
      }
      if (option[0].includes('View')) {
        if (option[0].includes('Departments')) {
          console.log('Departments View');
          this.viewDepartments(); 
        } else if (option[0].includes('Roles')) {
          console.log('Roles View');
          this.viewRoles();
        } else {
          console.log('Employees View')
          this.viewEmployees();
        }
      } else if (option[0].includes('Add')) {
        if (option[0].includes('Department')) {
          this.addDepartment(); 
        } else if (option[0].includes('Role')) {
          console.log('Role Add')
          this.addRole(); 
        } else {
          console.log('Employee Add')          
          this.addEmployee();
        }
      } else if (option[0].includes('Update')){
        console.log('Update Employee Role')        
        this.updateEmployee();
      } else {
        console.log('Thank you for your inputs');
        process.exit();
      }
    })
  }
}

// TO DO
// prompt for following: 
// VIEWS: View All Departments, View All Roles, View All Employees
// ADD: Add a Department, Add a Role, Add an Employee
// UPDATE: Update an Employee Role

module.exports = Prompts