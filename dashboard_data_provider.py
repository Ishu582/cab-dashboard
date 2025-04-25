import sqlite3
import pandas as pd
import json
from datetime import datetime, timedelta

class DashboardDataProvider:
    def __init__(self, db_path='cab_management.db'):
        self.conn = sqlite3.connect(db_path)
        self.cursor = self.conn.cursor()
    
    def get_active_trips(self):
        """Get active trips for the dashboard"""
        query = '''
        SELECT 
            t.trip_id,
            e.name as employee_name,
            t.pickup_location,
            t.destination,
            t.start_time,
            datetime(t.start_time, '+' || (julianday(t.end_time) - julianday(t.start_time)) * 0.7 * 86400 || ' seconds') as eta,
            d.name as driver_name,
            d.phone as driver_phone,
            d.rating as driver_rating,
            v.model || ' - ' || v.color || ' (' || v.license_plate || ')' as vehicle,
            t.status,
            CASE 
                WHEN t.status = 'in-progress' THEN 'On ' || (SELECT name FROM branches WHERE branch_id = (SELECT branch_id FROM employees WHERE employee_id = t.employee_id)) || ' Road, ' || CAST(RANDOM() * 10 AS INT) || ' miles from destination'
                ELSE 'Waiting for pickup'
            END as current_location,
            CASE
                WHEN t.status = 'in-progress' THEN CAST(RANDOM() * 100 AS INT)
                ELSE 0
            END as progress
        FROM 
            trips t
        JOIN 
            employees e ON t.employee_id = e.employee_id
        JOIN 
            drivers d ON t.driver_id = d.driver_id
        JOIN 
            vehicles v ON t.vehicle_id = v.vehicle_id
        WHERE 
            t.status IN ('scheduled', 'in-progress')
        ORDER BY 
            t.start_time
        LIMIT 10
        '''
        
        df = pd.read_sql_query(query, self.conn)
        
        # Format dates
        df['start_time'] = pd.to_datetime(df['start_time']).dt.strftime('%I:%M %p')
        df['eta'] = pd.to_datetime(df['eta']).dt.strftime('%I:%M %p')
        
        # Convert to dictionary format
        trips = df.to_dict('records')
        
        return trips
    
    def get_recent_trips(self):
        """Get recent trips for the dashboard"""
        query = '''
        SELECT 
            t.trip_id,
            e.name as employee,
            t.pickup_location as pickup,
            t.destination,
            date(t.start_time) as date,
            time(t.start_time) as time,
            t.status
        FROM 
            trips t
        JOIN 
            employees e ON t.employee_id = e.employee_id
        ORDER BY 
            t.start_time DESC
        LIMIT 5
        '''
        
        df = pd.read_sql_query(query, self.conn)
        
        # Format dates
        df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')
        df['time'] = pd.to_datetime(df['time'], format='%H:%M:%S').dt.strftime('%I:%M %p')
        
        # Convert to dictionary format
        trips = df.to_dict('records')
        
        return trips
    
    def get_bookings(self, filter_type=None):
        """Get bookings for the bookings page"""
        query = '''
        SELECT 
            b.booking_id as id,
            b.title,
            b.description,
            b.start_time,
            b.end_time,
            b.passengers,
            b.status,
            b.type,
            b.recurrence
        FROM 
            bookings b
        '''
        
        if filter_type and filter_type != 'all':
            query += f" WHERE b.type = '{filter_type}'"
        
        query += " ORDER BY b.start_time"
        
        df = pd.read_sql_query(query, self.conn)
        
        # Format dates
        df['start_time'] = pd.to_datetime(df['start_time'])
        df['end_time'] = pd.to_datetime(df['end_time'])
        
        # Convert to dictionary format
        bookings = df.to_dict('records')
        
        # Format dates for JSON
        for booking in bookings:
            booking['start_time'] = booking['start_time'].strftime('%Y-%m-%dT%H:%M:%S')
            booking['end_time'] = booking['end_time'].strftime('%Y-%m-%dT%H:%M:%S')
        
        return bookings
    
    def get_feedback(self, filter_sentiment=None):
        """Get feedback for the feedback page"""
        query = '''
        SELECT 
            f.feedback_id as id,
            e.name as employeeName,
            d.name as driverName,
            f.rating,
            date(f.created_at) as tripDate,
            f.comment,
            f.sentiment
        FROM 
            feedback f
        JOIN 
            trips t ON f.trip_id = t.trip_id
        JOIN 
            employees e ON t.employee_id = e.employee_id
        JOIN 
            drivers d ON t.driver_id = d.driver_id
        '''
        
        if filter_sentiment and filter_sentiment != 'all':
            query += f" WHERE f.sentiment = '{filter_sentiment}'"
        
        query += " ORDER BY f.created_at DESC"
        
        df = pd.read_sql_query(query, self.conn)
        
        # Format dates
        df['tripDate'] = pd.to_datetime(df['tripDate']).dt.strftime('%Y-%m-%d')
        
        # Convert to dictionary format
        feedback = df.to_dict('records')
        
        return feedback
    
    def get_dashboard_stats(self):
        """Get statistics for the dashboard"""
        # Active trips
        active_trips_query = '''
        SELECT COUNT(*) as count
        FROM trips
        WHERE status IN ('scheduled', 'in-progress')
        '''
        active_trips = pd.read_sql_query(active_trips_query, self.conn)['count'].iloc[0]
        
        # Total employees
        employees_query = '''
        SELECT COUNT(*) as count
        FROM employees
        '''
        total_employees = pd.read_sql_query(employees_query, self.conn)['count'].iloc[0]
        
        # Monthly expenses
        expenses_query = '''
        SELECT SUM(cost) as total
        FROM trips
        WHERE status = 'completed'
        AND start_time >= date('now', '-30 days')
        '''
        monthly_expenses = pd.read_sql_query(expenses_query, self.conn)['total'].iloc[0]
        if not monthly_expenses:
            monthly_expenses = 0
        
        # Scheduled rides
        scheduled_query = '''
        SELECT COUNT(*) as count
        FROM trips
        WHERE status = 'scheduled'
        AND start_time >= date('now')
        AND start_time <= date('now', '+7 days')
        '''
        scheduled_rides = pd.read_sql_query(scheduled_query, self.conn)['count'].iloc[0]
        
        # Calculate changes (mock data for demonstration)
        return {
            'active_trips': {
                'value': int(active_trips),
                'change': 12,
                'change_type': 'increase'
            },
            'total_employees': {
                'value': int(total_employees),
                'change': 8,
                'change_type': 'increase'
            },
            'monthly_expenses': {
                'value': f"${int(monthly_expenses):,}",
                'change': 5,
                'change_type': 'decrease'
            },
            'scheduled_rides': {
                'value': int(scheduled_rides),
                'change': 15,
                'change_type': 'increase'
            }
        }
    
    def get_usage_metrics(self):
        """Get usage metrics for the dashboard"""
        query = '''
        SELECT month, SUM(trips) as trips
        FROM usage_metrics
        GROUP BY month
        ORDER BY 
            CASE month
                WHEN 'Jan' THEN 1
                WHEN 'Feb' THEN 2
                WHEN 'Mar' THEN 3
                WHEN 'Apr' THEN 4
                WHEN 'May' THEN 5
                WHEN 'Jun' THEN 6
            END
        '''
        
        df = pd.read_sql_query(query, self.conn)
        
        # Calculate totals and averages
        total_trips = df['trips'].sum()
        monthly_avg = df['trips'].mean()
        
        # Calculate growth (comparing last month to previous)
        last_month = df.iloc[-1]['trips']
        prev_month = df.iloc[-2]['trips']
        growth_pct = ((last_month - prev_month) / prev_month) * 100
        
        return {
            'monthly_data': df.to_dict('records'),
            'total_trips': int(total_trips),
            'monthly_avg': int(monthly_avg),
            'growth': int(growth_pct)
        }
    
    def get_ai_insights(self):
        """Get AI insights for the dashboard"""
        # These would normally come from the AI model
        # For demonstration, we'll return static insights
        return [
            {
                'type': 'demand_prediction',
                'title': 'Demand Prediction',
                'message': 'Based on historical data, you should increase cab allocation on Mondays and Fridays by 15% to prevent underbooking.',
                'icon': 'trending-up'
            },
            {
                'type': 'cost_anomaly',
                'title': 'Cost Anomaly Detected',
                'message': 'The Marketing department\'s cab expenses are 32% higher than average this month. Consider investigating unusual usage patterns.',
                'icon': 'alert-triangle'
            },
            {
                'type': 'sentiment_analysis',
                'title': 'Sentiment Analysis',
                'message': 'Driver satisfaction ratings have improved by 12% after implementing the new feedback system. Keep up the good work!',
                'icon': 'thumbs-up'
            }
        ]
    
    def get_report_data(self, report_type='cost', time_range='month'):
        """Get data for reports page"""
        if report_type == 'cost':
            return self.get_cost_report(time_range)
        elif report_type == 'usage':
            return self.get_usage_report(time_range)
        elif report_type == 'feedback':
            return self.get_feedback_report(time_range)
        elif report_type == 'predictions':
            return self.get_prediction_report(time_range)
        else:
            return {'error': 'Invalid report type'}
    
    def get_cost_report(self, time_range):
        """Get cost analysis report data"""
        # Department costs
        query = '''
        SELECT department, SUM(cost) as cost
        FROM department_costs
        WHERE year = 2025
        GROUP BY department
        '''
        
        current_costs = pd.read_sql_query(query, self.conn)
        
        # Previous period costs
        query = '''
        SELECT department, SUM(cost) as cost
        FROM department_costs
        WHERE year = 2024
        GROUP BY department
        '''
        
        prev_costs = pd.read_sql_query(query, self.conn)
        
        # Merge data
        merged = current_costs.merge(prev_costs, on='department', suffixes=('_current', '_prev'))
        
        # Format for chart.js
        departments = merged['department'].tolist()
        current_data = merged['cost_current'].tolist()
        prev_data = merged['cost_prev'].tolist()
        
        # Top spending department
        top_dept = current_costs.loc[current_costs['cost'].idxmax()]['department']
        top_cost = current_costs.loc[current_costs['cost'].idxmax()]['cost']
        
        # Calculate average trip cost
        avg_query = '''
        SELECT AVG(cost) as avg_cost, COUNT(*) as trip_count
        FROM trips
        WHERE status = 'completed'
        '''
        
        avg_result = pd.read_sql_query(avg_query, self.conn)
        avg_cost = avg_result['avg_cost'].iloc[0]
        trip_count = avg_result['trip_count'].iloc[0]
        
        # Cost anomalies (mock data)
        anomalies = 12
        
        return {
            'chart_data': {
                'labels': departments,
                'current': current_data,
                'previous': prev_data
            },
            'top_spending': {
                'department': top_dept,
                'amount': f"${int(top_cost):,}",
                'change': '+18%'
            },
            'avg_trip_cost': {
                'amount': f"${avg_cost:.2f}",
                'trips': int(trip_count),
                'change': '-5%'
            },
            'anomalies': {
                'count': anomalies,
                'change': '+4'
            }
        }
    
    def get_usage_report(self, time_range):
        """Get usage patterns report data"""
        # Daily distribution data
        daily_query = '''
        SELECT 
            CASE strftime('%w', start_time)
                WHEN '0' THEN 'Sun'
                WHEN '1' THEN 'Mon'
                WHEN '2' THEN 'Tue'
                WHEN '3' THEN 'Wed'
                WHEN '4' THEN 'Thu'
                WHEN '5' THEN 'Fri'
                WHEN '6' THEN 'Sat'
            END as day,
            CASE 
                WHEN CAST(strftime('%H', start_time) AS INTEGER) BETWEEN 6 AND 10 THEN 'Morning (6-10)'
                WHEN CAST(strftime('%H', start_time) AS INTEGER) BETWEEN 11 AND 15 THEN 'Midday (11-3)'
                WHEN CAST(strftime('%H', start_time) AS INTEGER) BETWEEN 16 AND 20 THEN 'Evening (4-8)'
                ELSE 'Night (8-6)'
            END as time_period,
            COUNT(*) as trips
        FROM trips
        GROUP BY day, time_period
        '''
        
        daily_df = pd.read_sql_query(daily_query, self.conn)
        
        # Pivot the data
        daily_pivot = daily_df.pivot(index='day', columns='time_period', values='trips').reset_index()
        
        # Ensure all days are in correct order
        day_order = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        daily_pivot = daily_pivot.set_index('day').reindex(day_order).reset_index()
        
        # Fill NaN values with 0
        daily_pivot = daily_pivot.fillna(0)
        
        # Trip purpose breakdown
        purpose_query = '''
        SELECT 
            CASE
                WHEN b.title LIKE '%Office%' OR b.description LIKE '%Office%' THEN 'Office Commute'
                WHEN b.title LIKE '%Airport%' OR b.description LIKE '%Airport%' THEN 'Airport Transfer'
                WHEN b.title LIKE '%Client%' OR b.description LIKE '%Client%' THEN 'Client Meeting'
                WHEN b.title LIKE '%Event%' OR b.description LIKE '%Event%' THEN 'Event'
                ELSE 'Other'
            END as purpose,
            COUNT(*) as count
        FROM trips t
        LEFT JOIN bookings b ON t.booking_id = b.booking_id
        GROUP BY purpose
        '''
        
        purpose_df = pd.read_sql_query(purpose_query, self.conn)
        
        # Calculate percentages
        total = purpose_df['count'].sum()
        purpose_df['percentage'] = (purpose_df['count'] / total * 100).round().astype(int)
        
        # Most common route
        route_query = '''
        SELECT pickup_location, destination, COUNT(*) as count
        FROM trips
        GROUP BY pickup_location, destination
        ORDER BY count DESC
        LIMIT 1
        '''
        
        route_df = pd.read_sql_query(route_query, self.conn)
        most_common_route = f"{route_df['pickup_location'].iloc[0]} ↔ {route_df['destination'].iloc[0]}"
        
        # Get total trips for percentage calculation
        total_trips_query = '''
        SELECT COUNT(*) as count
        FROM trips
        '''
        total_trips = pd.read_sql_query(total_trips_query, self.conn)['count'].iloc[0]
        route_percentage = int((route_df['count'].iloc[0] / total_trips) * 100)
        
        return {
            'daily_distribution': {
                'labels': daily_pivot['day'].tolist(),
                'datasets': [
                    {
                        'label': 'Morning (6-10)',
                        'data': daily_pivot['Morning (6-10)'].tolist() if 'Morning (6-10)' in daily_pivot.columns else [0] * 7
                    },
                    {
                        'label': 'Evening (4-8)',
                        'data': daily_pivot['Evening (4-8)'].tolist() if 'Evening (4-8)' in daily_pivot.columns else [0] * 7
                    }
                ]
            },
            'trip_purpose': {
                'labels': purpose_df['purpose'].tolist(),
                'data': purpose_df['percentage'].tolist()
            },
            'peak_time': '8:30 - 9:30 AM',
            'most_common_route': {
                'route': most_common_route,
                'percentage': f"{route_percentage}%"
            }
        }
    
    def get_feedback_report(self, time_range):
        """Get feedback analysis report data"""
        # Rating distribution
        rating_query = '''
        SELECT rating, COUNT(*) as count
        FROM feedback
        GROUP BY rating
        ORDER BY rating DESC
        '''
        
        rating_df = pd.read_sql_query(rating_query, self.conn)
        
        # Calculate percentages
        total = rating_df['count'].sum()
        rating_df['percentage'] = (rating_df['count'] / total * 100).round().astype(int)
        
        # Overall rating
        overall_query = '''
        SELECT AVG(rating) as avg_rating, COUNT(*) as count
        FROM feedback
        '''
        
        overall_df = pd.read_sql_query(overall_query, self.conn)
        
        # Top complaints (mock data)
        complaints = [
            {'issue': 'Late arrivals', 'percentage': 42},
            {'issue': 'Vehicle cleanliness', 'percentage': 24},
            {'issue': 'Routing issues', 'percentage': 18}
        ]
        
        return {
            'rating_distribution': {
                'labels': [f"{int(r)} Stars" for r in rating_df['rating']],
                'data': rating_df['count'].tolist()
            },
            'overall_rating': {
                'rating': round(overall_df['avg_rating'].iloc[0], 1),
                'count': int(overall_df['count'].iloc[0])
            },
            'rating_percentages': rating_df.rename(columns={'rating': 'stars'}).to_dict('records'),
            'top_complaints': complaints
        }
    
    def get_prediction_report(self, time_range):
        """Get AI prediction report data"""
        # This would normally come from the AI model
        # For demonstration, we'll return mock data
        return {
            'demand_prediction': {
                'current': 198,
                'predicted': 228,
                'growth': 15
            },
            'suggested_actions': [
                'Increase fleet by 15% for next Monday',
                'Schedule 5 additional drivers for Friday evening'
            ],
            'potential_bottlenecks': [
                'Airport pickup demand spike on Thursday',
                'Multiple large events on March 25th'
            ],
            'projected_savings': '$3,450'
        }
    
    def close(self):
        """Close the database connection"""
        self.conn.close()
