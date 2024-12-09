import random
import string
from datetime import datetime, timedelta

num_ord = 2000
ord_id_range = range(1, num_ord+1)
cus_id_range = range(1, 2001)
emp_id_range = [3, 45, 2, 10, 34, 23, 9, 46, 15, 18]

def generate_cus():
    return random.choice(cus_id_range)

def generate_emp():
    return random.choice(emp_id_range)

# Generate unique phone numbers
def generate_phone_numbers(n):
    phone_numbers = set()
    while len(phone_numbers) < n:
        phone = "09" + "".join(random.choices(string.digits, k=8))
        phone_numbers.add(phone)
    return list(phone_numbers)

def generate_name(n):
    def random_fname():
        # List of common English first names
        first_names = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles", 
"Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Paul", "Steven", "Andrew", "Kenneth", 
"Joshua", "Kevin", "Brian", "George", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan", 
"Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon", "Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", 
"Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall"]

        return random.choice(first_names)
    
    def random_lname():
        # List of common English last names
        last_names = ["Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", 
"Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", 
"Allen", "Young", "Hernandez", "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", 
"Baker", "Gonzalez", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell"]

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

# Generate unique addresses
def generate_addresses(n):
    def random_street_name():
        # Random street names based on common patterns
        names = ["Main", "Oak", "Pine", "Maple", "Cedar", "Elm", "Washington", "Lake", "Hill", "Broadway"]
        return random.choice(names)

    def random_street_suffix():
        # Common street suffixes in the US
        suffixes = ["St", "Ave", "Blvd", "Rd", "Dr", "Ln", "Way", "Ct", "Pl", "Terr"]
        return random.choice(suffixes)

    def random_city():
        # Random US cities
        cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"]
        return random.choice(cities)

    def random_state():
        # US state abbreviations
        states = ["NY", "CA", "IL", "TX", "AZ", "PA", "FL", "OH", "MI", "GA"]
        return random.choice(states)

    addresses = set()
    while len(addresses) < n:
        street_number = random.randint(1, 9999)  # Street number
        street_name = random_street_name()
        street_suffix = random_street_suffix()
        city = random_city()
        state = random_state()
        zip_code = random.randint(10000, 99999)  # 5-digit ZIP code
        address = f"{street_number} {street_name} {street_suffix}, {city}, {state} {zip_code}"
        addresses.add(address)
    
    return list(addresses)

def generate_way():
    return random.choice(["cash", "credit card", "debt card", "transfer", "prepay"])


# Generate data
data = []
cname = generate_name(num_ord)
phone = generate_phone_numbers(num_ord)
caddress = generate_addresses(num_ord)
start_time = datetime.strptime("2024/8/1 10:00:00", "%Y/%m/%d %H:%M:%S")
end_time = datetime.strptime("2024/10/31 22:00:00", "%Y/%m/%d %H:%M:%S")
total_seconds = int((end_time - start_time).total_seconds())
time_step = total_seconds // (len(ord_id_range) - 1)
ctime = []
for idx, ord_id in enumerate(ord_id_range):
    current_time = start_time + timedelta(seconds=idx * time_step)
    ctime.append(current_time)
for ord in ord_id_range:
    data.append((ord, generate_cus(), cname[ord-1],  phone[ord-1], caddress[ord-1], generate_emp(), ctime[ord-1], generate_way(), 0, 0))

# Format data into SQL statements
output_lines = []
for OrdID, CusID, cus_name, cus_phone, cus_addr, emp_id, time, way, income, iscancel in data:
    line = (f"INSERT INTO orders (OrdID, CusID, name, phone, address, EmpID, create_time, Way_to_pay, income, isCancel) "
            f"VALUES ({OrdID}, {CusID}, '{cus_name}', '{cus_phone}', '{cus_addr}', {emp_id}, '{time}', '{way}', {income}, {iscancel});")
    output_lines.append(line)

# Save to file
output_file_path = "C:/Users/jacob/Desktop/DB2024_project/order_data.sql"
with open(output_file_path, "w") as f:
    f.write("\n".join(output_lines))

output_file_path