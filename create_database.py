import sqlite3
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Create visualizations directory if it doesn't exist
os.makedirs('static/visualizations', exist_ok=True)

# Create a connection to the SQLite database
conn = sqlite3.connect('cab_management.db')
cursor = conn.cursor()

# Create tables
def create_tables():
    # Branches table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS branches (
        branch_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        city TEXT NOT NULL,
        country TEXT NOT NULL
    )
    ''')

    # Employees table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS employees (
        employee_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        department TEXT NOT NULL,
        branch_id INTEGER,
        FOREIGN KEY (branch_id) REFERENCES branches (branch_id)
    )
    ''')

    # Drivers table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS drivers (
        driver_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        rating REAL NOT NULL,
        status TEXT NOT NULL
    )
    ''')

    # Vehicles table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS vehicles (
        vehicle_id INTEGER PRIMARY KEY,
        model TEXT NOT NULL,
        license_plate TEXT NOT NULL,
        color TEXT NOT NULL,
        status TEXT NOT NULL,
        driver_id INTEGER,
        last_maintenance DATE,
        FOREIGN KEY (driver_id) REFERENCES drivers (driver_id)
    )
    ''')

    # Bookings table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS bookings (
        booking_id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        start_time DATETIME NOT NULL,
        end_time DATETIME NOT NULL,
        passengers INTEGER NOT NULL,
        status TEXT NOT NULL,
        type TEXT NOT NULL,
        recurrence TEXT,
        employee_id INTEGER,
        FOREIGN KEY (employee_id) REFERENCES employees (employee_id)
    )
    ''')

    # Trips table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS trips (
        trip_id INTEGER PRIMARY KEY,
        employee_id INTEGER,
        driver_id INTEGER,
        vehicle_id INTEGER,
        pickup_location TEXT NOT NULL,
        destination TEXT NOT NULL,
        start_time DATETIME NOT NULL,
        end_time DATETIME,
        status TEXT NOT NULL,
        cost REAL,
        booking_id INTEGER,
        FOREIGN KEY (employee_id) REFERENCES employees (employee_id),
        FOREIGN KEY (driver_id) REFERENCES drivers (driver_id),
        FOREIGN KEY (vehicle_id) REFERENCES vehicles (vehicle_id),
        FOREIGN KEY (booking_id) REFERENCES bookings (booking_id)
    )
    ''')

    # Feedback table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS feedback (
        feedback_id INTEGER PRIMARY KEY,
        trip_id INTEGER,
        rating INTEGER NOT NULL,
        comment TEXT,
        sentiment TEXT NOT NULL,
        created_at DATETIME NOT NULL,
        FOREIGN KEY (trip_id) REFERENCES trips (trip_id)
    )
    ''')

    # Department costs table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS department_costs (
        id INTEGER PRIMARY KEY,
        department TEXT NOT NULL,
        month TEXT NOT NULL,
        year INTEGER NOT NULL,
        cost REAL NOT NULL
    )
    ''')

    # Usage metrics table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS usage_metrics (
        id INTEGER PRIMARY KEY,
        month TEXT NOT NULL,
        year INTEGER NOT NULL,
        trips INTEGER NOT NULL,
        department TEXT NOT NULL
    )
    ''')

    conn.commit()

# Insert sample data
def insert_sample_data():
    # Insert branches
    branches = [
        (1, 'Headquarters', 'New York', 'USA'),
        (2, 'West Coast Office', 'San Francisco', 'USA'),
        (3, 'European HQ', 'London', 'UK'),
        (4, 'Asia Pacific', 'Singapore', 'Singapore'),
        (5, 'South Asia', 'Bangalore', 'India')
    ]
    cursor.executemany('INSERT OR REPLACE INTO branches VALUES (?, ?, ?, ?)', branches)

    # Insert employees
    departments = ['Sales', 'Marketing', 'Engineering', 'HR', 'Finance', 'Operations']
    employees = []
    
    employee_names = [
        'Alex Johnson', 'Maria Garcia', 'David Kim', 'Sarah Wilson', 'James Lee',
        'Emily Brown', 'Michael Smith', 'Jessica Davis', 'Robert Miller', 'Jennifer Wilson',
        'William Moore', 'Elizabeth Taylor', 'John Anderson', 'Patricia Thomas', 'Richard Jackson',
        'Linda White', 'Charles Harris', 'Barbara Martin', 'Joseph Thompson', 'Margaret Garcia',
        'Thomas Martinez', 'Dorothy Robinson', 'Christopher Clark', 'Lisa Rodriguez', 'Daniel Lewis',
        'Nancy Lee', 'Paul Walker', 'Karen Hall', 'Mark Allen', 'Betty Young'
    ]
    
    for i in range(1, 31):
        name = employee_names[i-1]
        email = name.lower().replace(' ', '.') + '@example.com'
        department = random.choice(departments)
        branch_id = random.randint(1, 5)
        employees.append((i, name, email, department, branch_id))
    
    cursor.executemany('INSERT OR REPLACE INTO employees VALUES (?, ?, ?, ?, ?)', employees)

    # Insert drivers
    drivers = []
    driver_names = [
        'John Smith', 'Sarah Williams', 'Michael Johnson', 'Robert Brown', 'Lisa Chen',
        'David Rodriguez', 'Karen Martinez', 'Steven Taylor', 'Michelle Lee', 'Kevin Wilson',
        'Laura Davis', 'Brian Miller', 'Amanda White', 'Christopher Moore', 'Jennifer Harris'
    ]
    
    for i in range(1, 16):
        name = driver_names[i-1]
        phone = f'+1 (555) {random.randint(100, 999)}-{random.randint(1000, 9999)}'
        rating = round(random.uniform(3.5, 5.0), 1)
        status = random.choice(['active', 'inactive', 'on_trip'])
        drivers.append((i, name, phone, rating, status))
    
    cursor.executemany('INSERT OR REPLACE INTO drivers VALUES (?, ?, ?, ?, ?)', drivers)

    # Insert vehicles
    vehicles = []
    models = ['Toyota Camry', 'Honda Accord', 'Nissan Altima', 'Ford Fusion', 'Chevrolet Malibu']
    colors = ['White', 'Black', 'Silver', 'Blue', 'Red']
    
    for i in range(1, 16):
        model = random.choice(models)
        license_plate = f'{random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ")}{random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ")}{random.choice("ABCDEFGHIJKLMNOPQRSTUVWXYZ")}{random.randint(100, 999)}'
        color = random.choice(colors)
        status = random.choice(['active', 'maintenance', 'inactive'])
        driver_id = i
        last_maintenance = (datetime.now() - timedelta(days=random.randint(1, 60))).strftime('%Y-%m-%d')
        vehicles.append((i, model, license_plate, color, status, driver_id, last_maintenance))
    
    cursor.executemany('INSERT OR REPLACE INTO vehicles VALUES (?, ?, ?, ?, ?, ?, ?)', vehicles)

    # Insert bookings
    bookings = []
    booking_titles = [
        'Airport Pickup - Alex Johnson',
        'Team Outing - Product Team',
        'Daily Office Commute - Maria Garcia',
        'Client Meeting - Executive Team',
        'Airport Drop - David Kim',
        'Conference Transport - Marketing Team',
        'Office Relocation - HR Team',
        'Investor Meeting - Finance Team',
        'Training Session - Engineering Team',
        'Customer Visit - Sales Team'
    ]
    
    for i in range(1, 101):
        if i <= 10:
            title = booking_titles[i-1]
        else:
            title = f'Booking #{i} - {random.choice(employee_names)}'
        
        description = f'Transport to {random.choice(["Airport", "Office", "Client Site", "Conference Center", "Restaurant", "Hotel"])}'
        
        start_date = datetime.now() + timedelta(days=random.randint(-30, 30))
        start_time = start_date.replace(hour=random.randint(7, 18), minute=random.choice([0, 15, 30, 45]))
        end_time = start_time + timedelta(minutes=random.randint(30, 120))
        
        passengers = random.randint(1, 8)
        status = random.choice(['scheduled', 'in-progress', 'completed', 'cancelled'])
        booking_type = random.choice(['one-time', 'recurring'])
        recurrence = 'Weekdays' if booking_type == 'recurring' else None
        employee_id = random.randint(1, 30)
        
        bookings.append((i, title, description, start_time, end_time, passengers, status, booking_type, recurrence, employee_id))
    
    cursor.executemany('INSERT OR REPLACE INTO bookings VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', bookings)

    # Insert trips
    trips = []
    locations = [
        'Headquarters', 'West Branch Office', 'Airport Terminal 1', 'Airport Terminal 2', 
        'Convention Center', 'Downtown Office', 'Hotel Grandeur', 'Tech Conference Center',
        'Client Office - Downtown', '123 Main St'
    ]
    
    for i in range(1, 201):
        employee_id = random.randint(1, 30)
        driver_id = random.randint(1, 15)
        vehicle_id = random.randint(1, 15)
        
        pickup_location = random.choice(locations)
        destination = random.choice([loc for loc in locations if loc != pickup_location])
        
        start_date = datetime.now() + timedelta(days=random.randint(-60, 30))
        start_time = start_date.replace(hour=random.randint(7, 18), minute=random.choice([0, 15, 30, 45]))
        
        status = random.choice(['scheduled', 'in-progress', 'completed', 'cancelled'])
        
        if status in ['completed', 'cancelled']:
            end_time = start_time + timedelta(minutes=random.randint(30, 120))
        else:
            end_time = None
        
        cost = round(random.uniform(20, 200), 2) if status == 'completed' else None
        booking_id = random.randint(1, 100) if random.random() > 0.3 else None
        
        trips.append((i, employee_id, driver_id, vehicle_id, pickup_location, destination, start_time, end_time, status, cost, booking_id))
    
    cursor.executemany('INSERT OR REPLACE INTO trips VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', trips)

    # Insert feedback
    feedback = []
    positive_comments = [
        "Driver was very professional and the car was clean. Arrived early and got me to my destination ahead of schedule.",
        "Excellent service! Driver was punctual, professional, and very helpful with my luggage.",
        "Great experience, driver was courteous and vehicle was immaculate.",
        "Very satisfied with the service. Driver knew the best route to avoid traffic.",
        "Prompt service and comfortable ride. Will definitely use again."
    ]
    
    neutral_comments = [
        "Average service. Nothing special to note.",
        "Service was okay. Got me where I needed to go.",
        "Driver was on time but took a longer route than necessary.",
        "Car was clean but driver wasn't very communicative.",
        "Decent experience overall, but nothing exceptional."
    ]
    
    negative_comments = [
        "Driver was late and the car was not very clean. Communication was poor.",
        "Disappointing service. Driver got lost multiple times.",
        "Vehicle was in poor condition and driver was unprofessional.",
        "Driver was rude and took an unnecessarily long route.",
        "Very dissatisfied with the service. Will not use again."
    ]
    
    for i in range(1, 101):
        trip_id = random.randint(1, 200)
        rating = random.randint(1, 5)
        
        if rating >= 4:
            comment = random.choice(positive_comments)
            sentiment = 'positive'
        elif rating == 3:
            comment = random.choice(neutral_comments)
            sentiment = 'neutral'
        else:
            comment = random.choice(negative_comments)
            sentiment = 'negative'
        
        created_at = datetime.now() - timedelta(days=random.randint(1, 60))
        
        feedback.append((i, trip_id, rating, comment, sentiment, created_at))
    
    cursor.executemany('INSERT OR REPLACE INTO feedback VALUES (?, ?, ?, ?, ?, ?)', feedback)

    # Insert department costs
    department_costs = []
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    
    id_counter = 1
    for month in months:
        for department in departments:
            # Current month costs
            current_cost = random.randint(4000, 15000)
            department_costs.append((id_counter, department, month, 2025, current_cost))
            id_counter += 1
            
            # Previous month costs (slightly lower on average)
            prev_cost = int(current_cost * random.uniform(0.8, 1.1))
            department_costs.append((id_counter, department, month, 2024, prev_cost))
            id_counter += 1
    
    cursor.executemany('INSERT OR REPLACE INTO department_costs VALUES (?, ?, ?, ?, ?)', department_costs)

    # Insert usage metrics
    usage_metrics = []
    
    id_counter = 1
    for month in months:
        for department in departments:
            trips = random.randint(10, 100)
            usage_metrics.append((id_counter, month, 2025, trips, department))
            id_counter += 1
    
    cursor.executemany('INSERT OR REPLACE INTO usage_metrics VALUES (?, ?, ?, ?, ?)', usage_metrics)

    conn.commit()

# Create and populate the database
def setup_database():
    create_tables()
    insert_sample_data()
    print("Database created and populated successfully!")

if __name__ == "__main__":
    setup_database()
