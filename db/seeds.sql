INSERT INTO department (name) 
VALUES ('Engineering'),
('Finance'),
('Human Resources'),
('Sales');

INSERT INTO role (title, salary, department_id) 
VALUES ('Software Engineer', 60000, 1),
('Accountant', 55000, 2),
('HR Manager', 65000, 3),
('Sales Manager', 50000, 4),
('Junior Developer', 40000, 1),
('Senior Developer', 80000, 1),
('Lead Developer', 100000, 1),
('Financial Analyst', 70000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Sara', 'Johnson', 3, NULL),
('Michael', 'Brown', 4, NULL),
('Emily', 'Davis', 5, 1),
('James', 'Wilson', 6, 1),
('Mary', 'Clark', 7, 1),
('Robert', 'Lewis', 8, 2);