CREATE KEYSPACE test_table WITH replication = {'class':'NetworkTopologyStrategy', 'local-dc' : 1};

CREATE TABLE emp(
              emp_id int PRIMARY KEY,
              emp_name text,
              emp_city text
            );

INSERT INTO emp (emp_id, emp_name, emp_city) VALUES(1,'ram', 'Hyderabad');
INSERT INTO emp (emp_id, emp_name, emp_city) VALUES(2,'robin', 'Hyderabad');
INSERT INTO emp (emp_id, emp_name, emp_city) VALUES(3,'rahman', 'Chennai');

UPDATE emp SET emp_city='Delhi' WHERE emp_id=2;

SELECT * FROM emp WHERE emp_id=1;

DELETE emp_city FROM emp WHERE emp_id=3;