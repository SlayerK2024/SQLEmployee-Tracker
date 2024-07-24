const inquirer = require('inquirer');
const Database = require('./db/queries');
const cTable = require('console.table');

const db = new Database();

const mainMenu = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Update employee manager',
            'View employees by manager',
            'View employees by department',
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'View total utilized budget of a department',
            'Exit'
        ]
    }).then(async (answer) => {
        switch (answer.action) {
            case 'View all departments':
                console.table(await db.viewDepartments());
                mainMenu();
                break;
            case 'View all roles':
                console.table(await db.viewRoles());
                mainMenu();
                break;
            case 'View all employees':
                console.table(await db.viewEmployees());
                mainMenu();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Update employee manager':
                updateEmployeeManager();
                break;
            case 'View employees by manager':
                viewEmployeesByManager();
                break;
            case 'View employees by department':
                viewEmployeesByDepartment();
                break;
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'View total utilized budget of a department':
                viewDepartmentBudget();
                break;
            case 'Exit':
                db.client.end();
                break;
        }
    });
};

const addDepartment = () => {
    inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:',
    }).then(async (answer) => {
        await db.addDepartment(answer.name);
        console.log('Department added successfully');
        mainMenu();
    });
};

const addRole = () => {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the role:'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the role:'
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'Enter the department ID for the role:'
        }
    ]).then(async (answers) => {
        await db.addRole(answers.title, answers.salary, answers.department_id);
        console.log('Role added successfully');
        mainMenu();
    });
};

const addEmployee = () => {
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter the first name of the employee:'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the last name of the employee:'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter the role ID for the employee:'
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'Enter the manager ID for the employee (if any):'
        }
    ]).then(async (answers) => {
        await db.addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id || null);
        console.log('Employee added successfully');
        mainMenu();
    });
};

const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            name: 'employee_id',
            type: 'input',
            message: 'Enter the ID of the employee whose role you want to update:'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter the new role ID for the employee:'
        }
    ]).then(async (answers) => {
        await db.updateEmployeeRole(answers.employee_id, answers.role_id);
        console.log('Employee role updated successfully');
        mainMenu();
    });
};

const updateEmployeeManager = () => {
    inquirer.prompt([
        {
            name: 'employee_id',
            type: 'input',
            message: 'Enter the ID of the employee whose manager you want to update:'
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'Enter the new manager ID for the employee:'
        }
    ]).then(async (answers) => {
        await db.updateEmployeeManager(answers.employee_id, answers.manager_id);
        console.log('Employee manager updated successfully');
        mainMenu();
    });
};

const viewEmployeesByManager = () => {
    inquirer.prompt({
        name: 'manager_id',
        type: 'input',
        message: 'Enter the manager ID to view employees under that manager:',
    }).then(async (answer) => {
        console.table(await db.viewEmployeesByManager(answer.manager_id));
        mainMenu();
    });
};

const viewEmployeesByDepartment = () => {
    inquirer.prompt({
        name: 'department_id',
        type: 'input',
        message: 'Enter the department ID to view employees in that department:',
    }).then(async (answer) => {
        console.table(await db.viewEmployeesByDepartment(answer.department_id));
        mainMenu();
    });
};

const deleteDepartment = () => {
    inquirer.prompt({
        name: 'department_id',
        type: 'input',
        message: 'Enter the ID of the department you want to delete:',
    }).then(async (answer) => {
        await db.deleteDepartment(answer.department_id);
        console.log('Department deleted successfully');
        mainMenu();
    });
};

const deleteRole = () => {
    inquirer.prompt({
        name: 'role_id',
        type: 'input',
        message: 'Enter the ID of the role you want to delete:',
    }).then(async (answer) => {
        await db.deleteRole(answer.role_id);
        console.log('Role deleted successfully');
        mainMenu();
    });
};

const deleteEmployee = () => {
    inquirer.prompt({
        name: 'employee_id',
        type: 'input',
        message: 'Enter the ID of the employee you want to delete:',
    }).then(async (answer) => {
        await db.deleteEmployee(answer.employee_id);
        console.log('Employee deleted successfully');
        mainMenu();
    });
};

const viewDepartmentBudget = () => {
    inquirer.prompt({
        name: 'department_id',
        type: 'input',
        message: 'Enter the department ID to view the total utilized budget:',
    }).then(async (answer) => {
        const budget = await db.viewDepartmentBudget(answer.department_id);
        console.log(`The total utilized budget for department ${answer.department_id} is ${budget}`);
        mainMenu();
    });
};

mainMenu();
