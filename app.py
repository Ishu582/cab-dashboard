from flask import Flask, jsonify, request, send_from_directory, render_template
from flask_cors import CORS
from dashboard_data_provider import DashboardDataProvider
import ai_analysis
import os
import sqlite3

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# Ensure the database exists
if not os.path.exists('cab_management.db'):
    import create_database
    create_database.setup_database()

# Ensure the visualizations directory exists
if not os.path.exists('static/visualizations'):
    os.makedirs('static/visualizations')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/ai-insights')
def ai_insights_page():
    return render_template('ai-insights.html')

@app.route('/bookings')
def bookings_page():
    return render_template('bookings.html')

@app.route('/tracking')
def tracking_page():
    return render_template('tracking.html')

@app.route('/reports')
def reports_page():
    return render_template('reports.html')

@app.route('/feedback')
def feedback_page():
    return render_template('feedback.html')

@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    provider = DashboardDataProvider()
    stats = provider.get_dashboard_stats()
    provider.close()
    return jsonify(stats)

@app.route('/api/dashboard/active-trips', methods=['GET'])
def get_active_trips():
    provider = DashboardDataProvider()
    trips = provider.get_active_trips()
    provider.close()
    return jsonify(trips)

@app.route('/api/dashboard/recent-trips', methods=['GET'])
def get_recent_trips():
    provider = DashboardDataProvider()
    trips = provider.get_recent_trips()
    provider.close()
    return jsonify(trips)

@app.route('/api/dashboard/usage-metrics', methods=['GET'])
def get_usage_metrics():
    provider = DashboardDataProvider()
    metrics = provider.get_usage_metrics()
    provider.close()
    return jsonify(metrics)

@app.route('/api/dashboard/ai-insights', methods=['GET'])
def get_ai_insights():
    provider = DashboardDataProvider()
    insights = provider.get_ai_insights()
    provider.close()
    return jsonify(insights)

@app.route('/api/bookings', methods=['GET'])
def get_bookings():
    filter_type = request.args.get('filter', 'all')
    provider = DashboardDataProvider()
    bookings = provider.get_bookings(filter_type)
    provider.close()
    return jsonify(bookings)

@app.route('/api/feedback', methods=['GET'])
def get_feedback():
    filter_sentiment = request.args.get('filter', 'all')
    provider = DashboardDataProvider()
    feedback = provider.get_feedback(filter_sentiment)
    provider.close()
    return jsonify(feedback)

@app.route('/api/reports', methods=['GET'])
def get_reports():
    report_type = request.args.get('type', 'cost')
    time_range = request.args.get('range', 'month')
    provider = DashboardDataProvider()
    report_data = provider.get_report_data(report_type, time_range)
    provider.close()
    return jsonify(report_data)

@app.route('/api/ai/analyze', methods=['GET'])
def run_ai_analysis():
    analysis_type = request.args.get('type', 'all')
    
    conn = sqlite3.connect('cab_management.db')
    analyzer = ai_analysis.CabAnalytics(conn)
    
    if analysis_type == 'all':
        results = analyzer.run_all_analyses()
    elif analysis_type == 'cost':
        results = analyzer.cost_analysis()
    elif analysis_type == 'feedback':
        results = analyzer.feedback_analysis()
    elif analysis_type == 'usage':
        results = analyzer.usage_pattern_analysis()
    elif analysis_type == 'drivers':
        results = analyzer.driver_performance_analysis()
    else:
        results = {'error': 'Invalid analysis type'}
    
    conn.close()
    return jsonify(results)

@app.route('/api/ai/visualizations/<path:filename>')
def get_visualization(filename):
    return send_from_directory('static/visualizations', filename)

@app.route('/api/ai/generate-visualizations', methods=['GET'])
def generate_visualizations():
    # Run the AI analysis to generate visualizations
    conn = sqlite3.connect('cab_management.db')
    analyzer = ai_analysis.CabAnalytics(conn)
    
    # Generate visualizations and save them to static/visualizations
    cost_results = analyzer.cost_analysis()
    feedback_results = analyzer.feedback_analysis()
    usage_results = analyzer.usage_pattern_analysis()
    driver_results = analyzer.driver_performance_analysis()
    
    conn.close()
    
    # Return paths to the generated visualizations
    return jsonify({
        'cost': [f"/api/ai/visualizations/{viz}" for viz in cost_results.get('visualizations', [])],
        'feedback': [f"/api/ai/visualizations/{viz}" for viz in feedback_results.get('visualizations', [])],
        'usage': [f"/api/ai/visualizations/{viz}" for viz in usage_results.get('visualizations', [])],
        'drivers': [f"/api/ai/visualizations/{viz}" for viz in driver_results.get('visualizations', [])]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
