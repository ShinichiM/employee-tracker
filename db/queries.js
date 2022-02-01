const inquirer = require('inquirer');
const db = require('./connection');
var departments = new Array();

var employees = new Array();
const populateEmployees = function() {
    db.execute(`SELECT first_name last_name FROM employees`, (err, result) => {
        console.log(result)
        result.forEach(element => {
            employees.push(element);
        })
        console.log(employees);
    })
};

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
                    }
                )
            }
        )
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
    queryDepartmentName() {
        departments = [];
                db.query(`SELECT name FROM department`, (err, result) => {
                        result.forEach(element => departments.push(element.name))
                    });
                
                // reject('Please try again later.');
            
                
    };

    queryForDepartmentId(departmentName) {    
            db.query(`SELECT id FROM department WHERE name='${departmentName}'`, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                return(

                   result[0].id
                );
            });

            // reject('Please try again later'); 
    };
    insertRoleIntoDB(roleName, roleSalary, departmentId) {
        
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [roleName, roleSalary, departmentId], (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('success');
            });
            // reject('Please try again later'); 
    };

    addRole() {
        this.queryDepartmentName();
        return inquirer.prompt([ {
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
                            }]).then(answer => {
                                 let departmentId = this.queryForDepartmentId(answer.roleDepartment);
                                 this.insertRoleIntoDB(answer.roleName, answer.roleSalary, departmentId);
                            })
        // return this.queryDepartmentName().then(() => { 
        //     inquirer.prompt([ {
        //                         type: 'input',
        //                         name: 'roleName',
        //                         message: 'What is the name of the role?'
        //                     }, {
        //                         type: 'input',
        //                         name: 'roleSalary',
        //                         message: 'What is the salary of the role?'
        //                     }, {
        //                         type: 'list',
        //                         name: 'roleDepartment',
        //                         message:'Which department does the role belong to?',
        //                         choices: departments 
        //                     }])
        // }).then(answer => this.queryForDepartmentId(answer.roleDepartment)).then(data => {
        //     this.insertRoleIntoDB(data.rolename, data.roleSalary, data.departmentId);
        // })
    //    return (new Promise((resolve, reject) => {
    //         departments = [];
    //             return (new Promise ((resolve, reject) => {db.query(`SELECT name FROM department`, (err, result) => {
    //                 result.forEach(element => {
    //                     // console.log(element.name)
    //                     departments.push(element.name)
    //                 })
    //                 // console.log(departments)
    //                 return inquirer.prompt([ {
    //                         type: 'input',
    //                         name: 'roleName',
    //                         message: 'What is the name of the role?'
    //                     }, {
    //                         type: 'input',
    //                         name: 'roleSalary',
    //                         message: 'What is the salary of the role?'
    //                     }, {
    //                         type: 'list',
    //                         name: 'roleDepartment',
    //                         message:'Which department does the role belong to?',
    //                         choices: departments 
    //                     }]).then(answer =>  {
    //                     // console.log(answer);
    //                     // console.log(`SELECT id FROM department WHERE name='${answer.roleDepartment}'`);

    //                     return (new Promise((resolve, reject) => {db.query(`SELECT id FROM department WHERE name='${answer.roleDepartment}'`, (err, result) => {
    //                         console.log(result[0].id);
    //                         // console.log(`TEST ONE : ${answer.roleName},  ${answer.roleSalary},  ${answer.roleDepartment}, ${result}`);
    //                         const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    //                         let params = [answer.roleName, answer.roleSalary, result[0].id]; 
    //                         db.query(sql, params, (err, rows) => {
    //                             return rows;
    //                         })
    //                         return result; 
    //                     });
    //                 })
    //                 )})
    //                     //  END OF .then() FROM INQUIRER PROMPT
    //             })}))
    //             // END OF DB.QUERY
    //         })
    //     );
    };

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