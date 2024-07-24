const inquirer = require('inquirer');
const { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./index');

const mainMenu = async () => {
    const { action } = await inquirer.prompt({
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
            'Exit'
        ],
    });

    switch (action) {
        case 'View all departments':
            const departments = await getDepartments();
            console.table(departments);
            mainMenu();
            break;
        case 'View all roles':
            const roles = await getRoles();
            console.table(roles);
            mainMenu();
            break;
        case 'View all employees':
            const employees = await getEmployees();
            console.table(employees);
            mainMenu();
            break;
        case 'Add a department':
            const { name } = await inquirer.prompt({
                name: 'name',
                type: 'input',
                message: 'Enter the name of the department:',
            });
            await addDepartment(name);
            console.log(`Added ${name} to the database`);
            mainMenu();
            break;
        case 'Add a role':
            const departmentsForRole = await getDepartments();
            const { title, salary, department_id } = await inquirer.prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: 'Enter the name of the role:',
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'Enter the salary for the role:',
                },
                {
                    name: 'department_id',
                    type: 'list',
                    message: 'Select the department for the role:',
                    choices: departmentsForRole.map(department => ({ name: department.name, value: department.id })),
                },
            ]);
            await addRole(title, salary, department_id);
            console.log(`Added ${title} to the database`);
            mainMenu();
            break;
        case 'Add an employee':
            const rolesForEmployee = await getRoles();
            const employeesForManager = await getEmployees();
            const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: 'Enter the first name of the employee:',
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'Enter the last name of the employee:',
                },
                {
                    name: 'role_id',
                    type: 'list',
                    message: 'Select the role for the employee:',
                    choices: rolesForEmployee.map(role => ({ name: role.title, value: role.id })),
                },
                {
                    name: 'manager_id',
                    type: 'list',
                    message: 'Select the manager for the employee:',
                    choices: [{ name: 'None', value: null }].concat(employeesForManager.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }))),
                },
            ]);
            await addEmployee(first_name, last_name, role_id, manager_id);
            console.log(`Added ${first_name} ${last_name} to the database`);
            mainMenu();
            break;
        case 'Update an employee role':
            const employeesForUpdate = await getEmployees();
            const rolesForUpdate = await getRoles();
            const { employee_id, role_id: new_role_id } = await inquirer.prompt([
                {
                    name: 'employee_id',
                    type: 'list',
                    message: 'Select the employee to update:',
                    choices: employeesForUpdate.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
                },
                {
                    name: 'role_id',
                    type: 'list',
                    message: 'Select the new role for the employee:',
                    choices: rolesForUpdate.map(role => ({ name: role.title, value: role.id })),
                },
            ]);
            await updateEmployeeRole(employee_id, new_role_id);
            console.log(`Updated employee's role`);
            mainMenu();
            break;
        default:
            process.exit();
    }
};

mainMenu();
