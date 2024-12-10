import random
import string
from datetime import datetime, timedelta

num_mer = 1000
mer_id_range = range(201, 1001)

# def generate_name(n=40):
#     def random_fname():
#         # List of common English first names
#         first_names = ["Apple", "Banana", "Mango", "Orange", "Pineapple", "Grapes", "Watermelon", "Papaya", "Strawberry", "Blueberry", "Raspberry", "Kiwi", "Pomegranate", "Cherry", "Guava", "Peach", "Plum", "Coconut", "Dragon Fruit", "Lychee"]
#         return random.choice(first_names)
    
#     def random_lname():
#         # List of common English last names
#         last_names = ["Smoothie", "Juice"]
#         return random.choice(last_names)
    
#     name = set()
#     while len(name) < n:
#         fname = random_fname()
#         lname = random_lname()
#         name.add(f"{fname} {lname}")

#     fruit = ["Apple", "Banana", "Mango", "Orange", "Pineapple", "Grapes", "Watermelon", "Papaya", "Strawberry", "Blueberry", "Raspberry", "Kiwi", "Pomegranate", "Cherry", "Guava", "Peach", "Plum", "Coconut", "Dragon Fruit", "Lychee"]
#     for i in fruit:
#         name.add(i)

#     return list(name)

def generate_merchandise_names(count=800):
    # Categories and themes
    adjectives = [
        "Cool", "Stylish", "Premium", "Classic", "Modern", "Vintage", 
        "Exclusive", "Deluxe", "Compact", "Versatile", "Eco-Friendly", 
        "Smart", "Bold", "Elegant", "Durable", "Chic", "Vibrant", "Cozy", "Portable"
    ]
    
    categories = [
        "Mug", "T-shirt", "Notebook", "Bag", "Hat", "Bottle", "Sweater", 
        "Poster", "Sticker", "Shoes", "Phone Case", "Backpack", "Keychain", 
        "Lamp", "Blanket", "Scarf", "Wallet", "Watch", "Glasses", "Umbrella"
    ]
    
    modifiers = [
        "Pro", "Edition", "Plus", "Lite", "Max", "Classic", "Vibes", 
        "Essentials", "Basics", "Collection", "Series", "Glow", 
        "Set", "Wave", "Line", "Haven", "Spot", "World", "Works", "Trends"
    ]
    
    # Generate unique merchandise names
    merchandise_names = set()
    while len(merchandise_names) < count:
        name = f"{random.choice(adjectives)} {random.choice(categories)} {random.choice(modifiers)}"
        merchandise_names.add(name)
    
    return list(merchandise_names)

def generate_price():
    return random.choice(range(10, 1000))


start_time = datetime.strptime("2024/01/01 00:00:00", "%Y/%m/%d %H:%M:%S")
end_time = datetime.strptime("2024/09/30 23:59:59", "%Y/%m/%d %H:%M:%S")
total_seconds = int((end_time - start_time).total_seconds())
time_step = total_seconds // (len(mer_id_range) - 1)
ctime = []
for idx, mer_id in enumerate(mer_id_range):
    current_time = start_time + timedelta(seconds=idx * time_step)
    ctime.append(current_time)

data = [] 
name = generate_merchandise_names()
# print(len(name), len(ctime))
for mer in mer_id_range:
    data.append((mer, name[mer-201], generate_price(), 12, ctime[mer-201]))

# Format data into SQL statements
output_lines = []
for mer_id, mer_name, mer_price, remain, sdate in data:
    line = (f"INSERT INTO merchandise (MerID, Mer_name, retail_price, remain, start_date) "
            f"VALUES ({mer_id}, '{mer_name}', {mer_price}, {remain}, '{sdate}');")
    output_lines.append(line)

# Save to file
output_file_path = "C:/Users/jacob/Desktop/DB2024_project/merchandise_data.sql"
with open(output_file_path, "w") as f:
    f.write("\n".join(output_lines))

output_file_path