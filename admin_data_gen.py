# import re

# # SQL code as input
# sql_code = """
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (1, 'Joseph Anderson', '1996/10/24', '0912124923', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (2, 'John Smith', '1986/05/15', '0991962237', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (3, 'Thomas Jackson', '1998/04/28', '0944784786', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (4, 'Michael Smith', '1995/10/14', '0983683811', 3);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (5, 'William Brown', '1983/09/21', '0911726152', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (6, 'Joseph Harris', '1986/06/03', '0953964466', 3);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (7, 'James Smith', '1983/03/16', '0998867920', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (8, 'Richard White', '1989/07/06', '0904210980', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (9, 'Charles Johnson', '1988/10/12', '0962874931', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (10, 'William Smith', '1984/07/21', '0937000510', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (11, 'Robert Thomas', '1991/09/08', '0995609559', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (12, 'Charles Harris', '1990/01/09', '0963158346', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (13, 'Richard Brown', '1984/09/18', '0945227771', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (14, 'Thomas Anderson', '1982/07/23', '0902701625', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (15, 'James Anderson', '1984/05/08', '0973053664', 3);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (16, 'David Smith', '1990/05/20', '0957197951', 3);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (17, 'James Brown', '1996/12/18', '0929399506', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (18, 'Joseph Martin', '1996/08/23', '0917709770', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (19, 'Thomas White', '1984/05/08', '0963605962', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (20, 'William Johnson', '1982/08/13', '0975756829', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (21, 'John Taylor', '1992/10/28', '0964747019', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (22, 'John Johnson', '1992/02/07', '0920795435', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (23, 'Richard Johnson', '1985/10/03', '0950192706', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (24, 'John White', '1984/08/24', '0951172905', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (25, 'Charles Brown', '1994/07/18', '0913578490', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (26, 'Joseph White', '1990/04/01', '0949612110', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (27, 'Robert White', '1984/09/20', '0906478320', 3);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (28, 'Robert Brown', '1982/03/15', '0902439358', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (29, 'James Jackson', '1988/11/10', '0910915382', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (30, 'David White', '1982/07/12', '0909776767', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (31, 'William Taylor', '1986/08/16', '0959863083', 3);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (32, 'Thomas Martin', '1983/03/26', '0996784836', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (33, 'William Anderson', '1988/03/10', '0925943069', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (34, 'Thomas Smith', '1991/10/10', '0933603272', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (35, 'Richard Smith', '1996/08/01', '0922520476', 3);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (36, 'William Thomas', '1993/08/08', '0981666814', 3);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (37, 'Robert Smith', '1986/03/26', '0980588872', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (38, 'John Thomas', '1991/01/09', '0908421217', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (39, 'James Harris', '1985/12/03', '0977687914', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (40, 'John Martin', '1991/11/29', '0910395555', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (41, 'Richard Harris', '1988/11/05', '0961968965', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (42, 'David Thomas', '1986/11/21', '0905045633', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (43, 'Richard Anderson', '1980/08/23', '0943378581', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (44, 'David Taylor', '1996/06/14', '0971305073', 3);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (45, 'Thomas Brown', '1998/08/24', '0978253728', 1);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (46, 'William Jackson', '1985/08/08', '0998901640', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (47, 'Joseph Brown', '1993/12/15', '0969057401', 3);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (48, 'Joseph Taylor', '1999/05/08', '0990867662', 4);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (49, 'John Anderson', '1980/07/25', '0924685106', 2);
# INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) VALUES (50, 'Michael Brown', '1999/07/19', '0911365209', 1);
# """

# # Regular expression to extract names
# names = re.findall(r"VALUES \(\d+, '([^']+)'", sql_code)

# # Convert to desired format
# names_list = f"[{', '.join(repr(name) for name in names)}]"

# print(names_list)

import random

names = ['Joseph Anderson', 'John Smith', 'Thomas Jackson', 'Michael Smith', 'William Brown', 'Joseph Harris', 'James Smith', 'Richard White', 'Charles Johnson', 'William Smith', 'Robert Thomas', 'Charles Harris', 'Richard Brown', 'Thomas Anderson', 'James Anderson', 'David Smith', 'James Brown', 'Joseph Martin', 'Thomas White', 'William Johnson', 'John Taylor', 'John Johnson', 'Richard Johnson', 'John White', 'Charles Brown', 'Joseph White', 'Robert White', 'Robert Brown', 'James Jackson', 'David White', 'William Taylor', 'Thomas Martin', 'William Anderson', 'Thomas Smith', 'Richard Smith', 'William Thomas', 'Robert Smith', 'John Thomas', 'James Harris', 'John Martin', 'Richard Harris', 'David Thomas', 'Richard Anderson', 'David Taylor', 'Thomas Brown', 'William Jackson', 'Joseph Brown', 'Joseph Taylor', 'John Anderson', 'Michael Brown']

def generate_pass(n):
    password = set()
    while len(password) < n :
        password.add("".join(random.choices("0123456789abcdefghijklmnopqrstuvwxyz", k=random.randint(5, 8))))
    return list(password)

data = []
pword = generate_pass(50)
for n in range(1, 51):
    data.append((names[n-1], pword[n-1], n))

# Format data into SQL statements
output_lines = []
for n, p, id in data:
    line = (f"INSERT INTO admins ( username, password, indice ) "
            f"VALUES ('{n}', '{p}', {id});")
    output_lines.append(line)

# Save to file
output_file_path = "C:/Users/jacob/Desktop/DB2024_project/admin_data.sql"
with open(output_file_path, "w") as f:
    f.write("\n".join(output_lines))

output_file_path