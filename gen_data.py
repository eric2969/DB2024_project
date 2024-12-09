# import random
# import os

# # Updated configurations
# num_ord_ids = 7000  # Ensure OrdID is consecutive from 1 to 7000
# num_records = 100000  # Total records to generate
# ord_id_range = range(1, num_ord_ids + 1)
# mer_id_range = list(range(1, 1001))  # Convert range to list for random sampling
# quantity_range = range(1, 101)  # Example Quantity range

# # Generate data
# data = set()  # Use a set to ensure unique (OrdID, MerID) combinations

# # Calculate records per OrdID
# records_per_ord_id = num_records // num_ord_ids
# extra_records = num_records % num_ord_ids  # Handle uneven division

# for idx, ord_id in enumerate(ord_id_range):
#     # Calculate the number of records for this OrdID
#     current_records = records_per_ord_id + (1 if idx < extra_records else 0)

#     # Randomly assign unique MerID to each OrdID
#     mer_ids = random.sample(mer_id_range, current_records)  # Unique MerID for this OrdID
#     for mer_id in mer_ids:
#         quantity = random.choice(quantity_range)
#         data.add((ord_id, mer_id, quantity))  # Add unique record globally

# # Format data into SQL statements
# output_lines = []
# for ord_id, mer_id, quantity in sorted(data):  # Sorting for better organization
#     line = (f"INSERT INTO order_detail (OrdID, MerID, Quantity) "
#             f"VALUES ({ord_id}, {mer_id}, {quantity});")
#     output_lines.append(line)

# # Save to file
# output_file_path = "C:/Users/jacob/Desktop/DB2024_project/order_detail.sql"
# os.makedirs(os.path.dirname(output_file_path), exist_ok=True)  # Ensure directory exists
# with open(output_file_path, "w") as f:
#     f.write("\n".join(output_lines))

# print(f"SQL data saved to: {output_file_path}")

# import random
# import string
# from datetime import datetime, timedelta

# num_emp = 50
# emp_id_range = range(1, num_emp+1)

# # Generate unique phone numbers
# def generate_phone_numbers(n):
#     phone_numbers = set()
#     while len(phone_numbers) < n:
#         phone = "09" + "".join(random.choices(string.digits, k=8))
#         phone_numbers.add(phone)
#     return list(phone_numbers)

# def generate_dept():
#     return random.choices(range(1, 5))

# # Generate unique addresses
# # def generate_addresses(n):
# #     def random_chinese_characters():
# #         return "".join(random.choices("一二三四五六七八九十甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥", k=random.randint(1, 3)))

    
# #     addresses = set()
# #     while len(addresses) < n:
# #         city = random_chinese_characters() + "市"
# #         district = random_chinese_characters() + "區"
# #         road = random_chinese_characters() + "路"
# #         number = f"{random.randint(1, 200)}號"
# #         address = f"{city}{district}{road}{number}"
# #         addresses.add(address)
# #     return list(addresses)

# # Generate name
# def generate_name(n):
#     def random_fname():
#         # List of common English first names
#         first_names = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"]
#         return random.choice(first_names)
    
#     def random_lname():
#         # List of common English last names
#         last_names = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin"]
#         return random.choice(last_names)
    
#     name = set()
#     while len(name) < n:
#         fname = random_fname()
#         lname = random_lname()
#         name.add(f"{fname} {lname}")
#     return list(name)

# def generate_random_date(start_date="1980/01/01", end_date="2000/01/01"):
#     """
#     Generate a random date between the specified start_date and end_date.
    
#     Args:
#         start_date (str): The start date in "YYYY/MM/DD" format.
#         end_date (str): The end date in "YYYY/MM/DD" format.
        
#     Returns:
#         str: A random date in "YYYY/MM/DD" format.
#     """
#     # Convert strings to datetime objects
#     start = datetime.strptime(start_date, "%Y/%m/%d")
#     end = datetime.strptime(end_date, "%Y/%m/%d")
    
#     # Generate a random number of days between start and end
#     delta = end - start
#     random_days = random.randint(0, delta.days)
    
#     # Calculate the random date
#     random_date = start + timedelta(days=random_days)
#     return random_date.strftime("%Y/%m/%d")

# # Generate data
# data = []
# phone = generate_phone_numbers(num_emp)
# name = generate_name(num_emp)
# # print(len(name), len(phone), num_emp)
# for emp in emp_id_range:
#     data.append((emp, name[emp-1], generate_random_date(), phone[emp-1], generate_dept()))

# # Format data into SQL statements
# output_lines = []
# for emp_id, emp_name, emp_bth, emp_phone, dept in data:
#     line = (f"INSERT INTO order_detail (EmpID, Emp_name, Emp_bth, Emp_phone, Emp_dept) "
#             f"VALUES ({emp_id}, {emp_name}, {emp_bth}, '{emp_phone}', '{dept}');")
#     output_lines.append(line)

# # Save to file
# output_file_path = "C:/Users/jacob/Desktop/DB2024_project/employee_data.sql"
# with open(output_file_path, "w") as f:
#     f.write("\n".join(output_lines))

# output_file_path

import random
import datetime
import string

# Updated configurations
num_ord_ids = 7000  # Ensure OrdID is consecutive from 1 to 7000
num_records = 100000  # Total records to generate
ord_id_range = range(1, num_ord_ids + 1)
mer_id_range = range(1, 1001)  # Example MerID range
quantity_range = range(1, 101)  # Example Quantity range

# Generate unique phone numbers
def generate_phone_numbers(n):
    phone_numbers = set()
    while len(phone_numbers) < n:
        phone = "09" + "".join(random.choices(string.digits, k=8))
        phone_numbers.add(phone)
    return list(phone_numbers)

# Generate unique addresses
def generate_addresses(n):
    def random_chinese_characters():
        return "".join(random.choices("一二三四五六七八九十甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥", k=random.randint(1, 3)))
    
    addresses = set()
    while len(addresses) < n:
        city = random_chinese_characters() + "市"
        district = random_chinese_characters() + "區"
        road = random_chinese_characters() + "路"
        number = f"{random.randint(1, 200)}號"
        address = f"{city}{district}{road}{number}"
        addresses.add(address)
    return list(addresses)

# Generate data
data = []
ord_id_to_create_time = {}
phone_numbers = generate_phone_numbers(num_ord_ids)
addresses = generate_addresses(num_ord_ids)

records_per_ord_id = num_records // num_ord_ids
extra_records = num_records % num_ord_ids  # Handle uneven division

for idx, ord_id in enumerate(ord_id_range):
    # Assign a create_time to each OrdID, ensuring later OrdIDs have later times
    if ord_id not in ord_id_to_create_time:
        ord_id_to_create_time[ord_id] = datetime.datetime.now() - datetime.timedelta(seconds=(num_ord_ids - ord_id))
    create_time = ord_id_to_create_time[ord_id]

    # Calculate the number of records for this OrdID
    current_records = records_per_ord_id + (1 if idx < extra_records else 0)

    # Ensure unique MerID for each OrdID while creating multiple records
    mer_ids_used = set()
    for _ in range(current_records):
        while True:
            mer_id = random.choice(mer_id_range)
            if mer_id not in mer_ids_used:
                mer_ids_used.add(mer_id)
                break
        quantity = random.choice(quantity_range)
        phone = phone_numbers[idx]
        address = addresses[idx]
        data.append((ord_id, mer_id, quantity, create_time, phone, address))

# Format data into SQL statements
output_lines = []
for ord_id, mer_id, quantity, create_time, phone, address in data:
    formatted_time = create_time.strftime('%Y-%m-%d %H:%M:%S')
    line = (f"INSERT INTO order_detail (OrdID, MerID, Quantity, create_time, phone, address) "
            f"VALUES ({ord_id}, {mer_id}, {quantity}, '{formatted_time}', '{phone}', '{address}');")
    output_lines.append(line)

# Save to file
output_file_path = "/mnt/data/order_detail_data_updated_100000.sql"
with open(output_file_path, "w") as f:
    f.write("\n".join(output_lines))

output_file_path
