INSERT INTO department(id, names)
VALUES(1, 'sales'),
(2, 'Engineering'),
(3, 'Finance');

INSERT INTO roles(id, title, salary, department_id)
VALUES(1, 'Sales Lead', 100000, 1),
(2, 'Lead Engineer', 150000, 2),
(3, 'Account Manager', 160000, 3);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES(1, 'Robert', 'Smith', 1, NULL),
(2, 'Samantha', 'Brown', 2, NULL),
(3, 'John', 'Doe', 3, NULL);
