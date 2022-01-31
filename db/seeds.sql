
INSERT INTO department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('QA'),
    ('Finance');

INSERT INTO roles (title, salary, department_id) VALUES 
    ('Sales Person', 80000, 1),
    ('Engineer', 100000, 2),
    ('Accoutnant', 90000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES 
    ('George', 'Smith', 1, null),
    ('Lesner', 'Brock', 1, null),
    ('Will', 'Smith', 3, null);