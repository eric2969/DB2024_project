import random

mgn = [2, 13, 20, 37]
import random

# Initial list of numbers from 1 to 50
numbers = list(range(1, 51))

# Removing specified numbers
remaining_numbers = [num for num in numbers if num not in mgn]

# Shuffling the remaining numbers
random.shuffle(remaining_numbers)

# Dividing into groups
group1 = remaining_numbers[:15] # 10:00:00 ~ 16:00:00
group2 = remaining_numbers[15:30] # 16:00:00 ~ 22:00:00
group3 = remaining_numbers[30:] # 10:00:00 ~ 18:00:00

names = ['Joseph Anderson', 'John Smith', 'Thomas Jackson', 'Michael Smith', 'William Brown', 'Joseph Harris', 'James Smith', 'Richard White', 'Charles Johnson', 'William Smith', 'Robert Thomas', 'Charles Harris', 'Richard Brown', 'Thomas Anderson', 'James Anderson', 'David Smith', 'James Brown', 'Joseph Martin', 'Thomas White', 'William Johnson', 'John Taylor', 'John Johnson', 'Richard Johnson', 'John White', 'Charles Brown', 'Joseph White', 'Robert White', 'Robert Brown', 'James Jackson', 'David White', 'William Taylor', 'Thomas Martin', 'William Anderson', 'Thomas Smith', 'Richard Smith', 'William Thomas', 'Robert Smith', 'John Thomas', 'James Harris', 'John Martin', 'Richard Harris', 'David Thomas', 'Richard Anderson', 'David Taylor', 'Thomas Brown', 'William Jackson', 'Joseph Brown', 'Joseph Taylor', 'John Anderson', 'Michael Brown']

