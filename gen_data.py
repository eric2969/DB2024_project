import random
import os

# Updated configurations
num_ord_ids = 7000  # Ensure OrdID is consecutive from 1 to 7000
num_records = 100000  # Total records to generate
ord_id_range = range(1, num_ord_ids + 1)
mer_id_range = list(range(1, 1001))  # Convert range to list for random sampling
quantity_range = range(1, 101)  # Example Quantity range

# Generate data
data = set()  # Use a set to ensure unique (OrdID, MerID) combinations

# Calculate records per OrdID
records_per_ord_id = num_records // num_ord_ids
extra_records = num_records % num_ord_ids  # Handle uneven division

for idx, ord_id in enumerate(ord_id_range):
    # Calculate the number of records for this OrdID
    current_records = records_per_ord_id + (1 if idx < extra_records else 0)

    # Randomly assign unique MerID to each OrdID
    mer_ids = random.sample(mer_id_range, current_records)  # Unique MerID for this OrdID
    for mer_id in mer_ids:
        quantity = random.choice(quantity_range)
        data.add((ord_id, mer_id, quantity))  # Add unique record globally

# Format data into SQL statements
output_lines = []
for ord_id, mer_id, quantity in sorted(data):  # Sorting for better organization
    line = (f"INSERT INTO order_detail (OrdID, MerID, Quantity) "
            f"VALUES ({ord_id}, {mer_id}, {quantity});")
    output_lines.append(line)

# Save to file
output_file_path = "C:/Users/jacob/Desktop/DB2024_project/order_detail.sql"
os.makedirs(os.path.dirname(output_file_path), exist_ok=True)  # Ensure directory exists
with open(output_file_path, "w") as f:
    f.write("\n".join(output_lines))

print(f"SQL data saved to: {output_file_path}")
