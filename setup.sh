#!/bin/bash

# Create and activate virtual environment
echo "Creating virtual environment..."
python -m venv venv
source venv/bin/activate

# Install required packages
echo "Installing required packages..."
pip install flask flask-cors pandas numpy scikit-learn matplotlib seaborn nltk

# Initialize the database
echo "Creating and populating the database..."
python create_database.py

echo "Setup complete! You can now run the application with:"
echo "python app.py"
