const { Client } = require('pg');

class Database {
    constructor() {
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'company_db',
            password: '1118',
            port: 5432,
        });

        this.client.connect();
    }

    viewDepartments() {
        return this.client.query('SELECT * FROM departments')
            .then(res => res.rows)
            .catch(err => console.error(err.stack));
    }

    viewRoles() {
        const query = `
            SELECT roles.id, roles.title, roles.salary, departments.name AS department 
            FROM roles 
            JOIN departments ON roles.department_id = departments.id;
        `;
        return this.client.query(query)
            .then(res => res.rows)
            .catch(err => console.error(err.stack));
    }

    viewEmployees() {
        const query = `
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
            FROM employees 
            JOIN roles ON employees.role_id = roles.id 
            JOIN departments ON roles.department_id = departments.id 
            LEFT JOIN employees manager ON manager.id = employees.manager_id;
        `;
        return this.client.query(query)
            .then(res => res.rows)
            .catch(err => console.error(err.stack));
    }

    addDepartment(name) {
        return this.client.query('INSERT INTO departments (name) VALUES ($1)', [name])
            .then(() => 'Department added successfully')
            .catch(err => console.error(err.stack));
    }

    addRole(title, salary, department_id) {
        return this.client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id])
            .then(() => 'Role added successfully')
            .catch(err => console.error(err.stack));
    }

    addEmployee(first_name, last_name, role_id, manager_id) {
        return this.client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id])
            .then(() => 'Employee added successfully')
            .catch(err => console.error(err.stack));
    }

    updateEmployeeRole(employee_id, role_id) {
        return this.client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id])
            .then(() => 'Employee role updated successfully')
            .catch(err => console.error(err.stack));
    }

    updateEmployeeManager(employee_id, manager_id) {
        return this.client.query('UPDATE employees SET manager_id = $1 WHERE id = $2', [manager_id, employee_id])
            .then(() => 'Employee manager updated successfully')
            .catch(err => console.error(err.stack));
    }

    viewEmployeesByManager(manager_id) {
        const query = `
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary
            FROM employees
            JOIN roles ON employees.role_id = roles.id
            JOIN departments ON roles.department_id = departments.id
            WHERE employees.manager_id = $1;
        `;
        return this.client.query(query, [manager_id])
            .then(res => res.rows)
            .catch(err => console.error(err.stack));
    }

    viewEmployeesByDepartment(department_id) {
        const query = `
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, 
            CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
            FROM employees 
            JOIN roles ON employees.role_id = roles.id 
            JOIN departments ON roles.department_id = departments.id 
            LEFT JOIN employees manager ON manager.id = employees.manager_id
            WHERE departments.id = $1;
        `;
        return this.client.query(query, [department_id])
            .then(res => res.rows)
            .catch(err => console.error(err.stack));
    }

    deleteDepartment(department_id) {
        return this.client.query('DELETE FROM departments WHERE id = $1', [department_id])
            .then(() => 'Department deleted successfully')
            .catch(err => console.error(err.stack));
    }

    deleteRole(role_id) {
        return this.client.query('DELETE FROM roles WHERE id = $1', [role_id])
            .then(() => 'Role deleted successfully')
            .catch(err => console.error(err.stack));
    }

    deleteEmployee(employee_id) {
        return this.client.query('DELETE FROM employees WHERE id = $1', [employee_id])
            .then(() => 'Employee deleted successfully')
            .catch(err => console.error(err.stack));
    }

    viewDepartmentBudget(department_id) {
        const query = `
            SELECT SUM(roles.salary) AS total_budget 
            FROM employees 
            JOIN roles ON employees.role_id = roles.id 
            WHERE roles.department_id = $1;
        `;
        return this.client.query(query, [department_id])
            .then(res => res.rows[0].total_budget)
            .catch(err => console.error(err.stack));
    }
}

module.exports = Database;
