import random
import string
from datetime import datetime, timedelta

num_emp = 50
emp_id_range = range(1, num_emp+1)

# Generate unique phone numbers
def generate_phone_numbers(n):
    phone_numbers = set()
    while len(phone_numbers) < n:
        phone = "09" + "".join(random.choices(string.digits, k=8))
        phone_numbers.add(phone)
    return list(phone_numbers)

def generate_dept():
    return random.choice(range(1, 5))

def generate_name(n):
    def random_fname():
        # List of common English first names
        first_names = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"]
        return random.choice(first_names)
    
    def random_lname():
        # List of common English last names
        last_names = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin"]
        return random.choice(last_names)
    
    name = set()
    while len(name) < n:
        fname = random_fname()
        lname = random_lname()
        name.add(f"{fname} {lname}")
    return list(name)

def generate_random_date(start_date="1980/01/01", end_date="2000/01/01"):
    """
    Generate a random date between the specified start_date and end_date.
    
    Args:
        start_date (str): The start date in "YYYY/MM/DD" format.
        end_date (str): The end date in "YYYY/MM/DD" format.
        
    Returns:
        str: A random date in "YYYY/MM/DD" format.
    """
    # Convert strings to datetime objects
    start = datetime.strptime(start_date, "%Y/%m/%d")
    end = datetime.strptime(end_date, "%Y/%m/%d")
    
    # Generate a random number of days between start and end
    delta = end - start
    random_days = random.randint(0, delta.days)
    
    # Calculate the random date
    random_date = start + timedelta(days=random_days)
    return random_date.strftime("%Y/%m/%d")

# Generate data
data = []
phone = generate_phone_numbers(num_emp)
name = generate_name(num_emp)
# print(len(name), len(phone), num_emp)
for emp in emp_id_range:
    tmp = generate_dept()
    # print(len(tmp))
    data.append((emp, name[emp-1], generate_random_date(), phone[emp-1], tmp))

# Format data into SQL statements
output_lines = []
for emp_id, emp_name, emp_bth, emp_phone, dept in data:
    line = (f"INSERT INTO employee (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) "
            f"VALUES ({emp_id}, '{emp_name}', '{emp_bth}', '{emp_phone}', {dept});")
    output_lines.append(line)

# Save to file
output_file_path = "C:/Users/jacob/Desktop/DB2024_project/employee_data.sql"
with open(output_file_path, "w") as f:
    f.write("\n".join(output_lines))

output_file_path