const inquirer = require('inquirer');
const db = require('./connection');
var departments = new Array();
const populateDepartment = new Promise((resolve, reject) => {
    db.execute(`SELECT name FROM department`, (err, result) => {
        result.forEach(element => {
            departments.push(element.name)
        })
    })
});
var employees = new Array();
const populateEmployees = function() {
    db.execute(`SELECT first_name last_name FROM employees`, (err, result) => {
        console.log(result)
        result.forEach(element => {
            employees.push(element);
        })
        console.log(employees);
    })
}
const roleQuestions = [ {
    type: 'input',
    name: 'roleName',
    message: 'What is the name of the role?'
}, {
    type: 'input',
    name: 'roleSalary',
    message: 'What is the salary of the role?'
}, {
    type: 'list',
    name: 'roleDepartment',
    message:'Which department does the role belong to?',
    choices: departments 
}];

const employeeQuestions = [
    {
        type: 'input',
        name: 'employeeFirst',
        message: 'What is the employees first name?'
    }, {
        type: 'input',
        name: 'employeeLast',
        message: 'Which department does the role belong to?'
    }, {
        type: 'input',
        name: 'employeeRole',
        message: 'What is the employees role?'
    }, {
        type: 'input',
        name: 'employeeManager',
        message: 'Who is the employees manager?'
    }];

const updateEmployeeQuestion = [{
    type: 'list',
    name: 'updateEmployee',
    messagae: 'Which employees role do you want to update?',
    choices: "test" 
    }];


class Query {
    constructor() {

    }

    getAllDepartments() {
        return(new Promise((resolve, reject) => {
            resolve("success");
            reject(new Error("please try again.")) 

        const sql = `SELECT * FROM department`;
        db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('success');
                console.table(rows);
            });
        })
    )};

    getAllRoles() {
        return(new Promise((resolve, reject) => {
            resolve('Success');
            reject(new Error('please try again'));

        const sql = `SELECT * FROM roles`;
        db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('success');
                console.table(rows);
            })
        })
    )};
    
    getAllEmployees() {
        return (new Promise((resolve, reject) => {
            resolve('success');
            reject(new Error('please try again'));


        const sql = `SELECT * FROM employee`;
        db.query(sql, (err, rows) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Success');
                console.table(rows)
            });
        })
    )};

    addDepartment() {
        return (inquirer.prompt([{type: 'input', name: 'departmentName',message: "Please enter the Department Name"}]).then(answer => {
                const sql = 'INSERT INTO department (name) VALUES (?)';
                // console.log(answer.departmentName);
                db.query(sql, Array(answer.departmentName), (err, rows) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(rows);
                })
            })
        );
    };

    addRole() { 
        return (new Promise((resolve, reject) => {
            resolve('success');
            reject(new Error('please try again'));

        populateDepartment();
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
        inquirer.prompt(roleQuestions).then(answer => {
                console.log(answer);
            })
        })
    )};

    addEmployee() {
        employees();
        console.log()
        const sql = ``;
        inquirer.prompt({type: 'input', message:'I hope this is working'});
    }

    updateEmployee() {

    }
}

module.exports = Query;