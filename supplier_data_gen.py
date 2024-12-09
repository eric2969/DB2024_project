import random
import string

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

def generate_phone_numbers(n):
    phone_numbers = set()
    while len(phone_numbers) < n:
        phone = "09" + "".join(random.choices(string.digits, k=8))
        phone_numbers.add(phone)
    return list(phone_numbers)

data = []
sup_name = generate_name(30)
sup_phone = generate_phone_numbers(30)
for sup in range(1, 31):
    data.append((sup, sup_name[sup-1], sup_phone[sup-1]))

output_lines = []
for supID, supname, supphone in data:
    line = (f"INSERT INTO supplier (SuppID, Supp_name, Supp_phone) "
            f"VALUES ({supID}, '{supname}', '{supphone}');")
    output_lines.append(line)

# Save to file
output_file_path = "C:/Users/jacob/Desktop/DB2024_project/supplier_data.sql"
with open(output_file_path, "w") as f:
    f.write("\n".join(output_lines))

output_file_path