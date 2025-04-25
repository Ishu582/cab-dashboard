# Corporate Cab Management Dashboard - AI Integration

This project provides the backend database and AI analysis components for the Corporate Cab Management Dashboard. It includes a SQLite database with sample data, Python scripts for AI analysis, and a Flask API to serve data to the frontend.

## Features

- **Sample Database**: SQLite database with tables for employees, drivers, vehicles, trips, bookings, feedback, and more
- **AI Analysis**: Python scripts for analyzing costs, feedback, usage patterns, and driver performance
- **Data Provider**: Python class for retrieving formatted data for the dashboard
- **API**: Flask API to serve data to the frontend

## Setup

1. Run the setup script to create a virtual environment and install dependencies:

\`\`\`bash
chmod +x setup.sh
./setup.sh
\`\`\`

2. Start the Flask API:

\`\`\`bash
python app.py
\`\`\`

The API will be available at http://localhost:5000

## API Endpoints

- `/api/dashboard/stats` - Get dashboard statistics
- `/api/dashboard/active-trips` - Get active trips
- `/api/dashboard/recent-trips` - Get recent trips
- `/api/dashboard/usage-metrics` - Get usage metrics
- `/api/dashboard/ai-insights` - Get AI insights
- `/api/bookings` - Get bookings (optional filter parameter)
- `/api/feedback` - Get feedback (optional filter parameter)
- `/api/reports` - Get report data (optional type and range parameters)
- `/api/ai/analyze` - Run AI analysis (optional type parameter)

## AI Analysis

The AI analysis includes:

1. **Cost Analysis**: Detects anomalies in department costs using Isolation Forest
2. **Feedback Analysis**: Analyzes sentiment and extracts key topics using LDA
3. **Usage Pattern Analysis**: Identifies peak usage times and predicts future demand
4. **Driver Performance Analysis**: Clusters drivers based on performance metrics

## Database Schema

- **branches**: Branch offices information
- **employees**: Employee information
- **drivers**: Driver information
- **vehicles**: Vehicle information
- **bookings**: Booking information
- **trips**: Trip information
- **feedback**: Feedback information
- **department_costs**: Department cost information
- **usage_metrics**: Usage metrics information

## Integration with Frontend

To integrate with the frontend:

1. Ensure the Flask API is running
2. Update the API base URL in the frontend code if necessary
3. Use the API endpoints to fetch data for the dashboard

## Sample Data

The database is populated with sample data that matches what's shown in the dashboard. You can modify the `create_database.py` script to generate different data if needed.
