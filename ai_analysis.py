import sqlite3
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.ensemble import IsolationForest, RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from datetime import datetime, timedelta
import os

# Create visualizations directory if it doesn't exist
os.makedirs('static/visualizations', exist_ok=True)

# Download NLTK resources
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)

class CabAnalytics:
    def __init__(self, conn):
        self.conn = conn
        self.cursor = conn.cursor()
    
    def cost_analysis(self):
        """Analyze department costs and detect anomalies"""
        # Get department costs data
        query = '''
        SELECT department, month, year, cost 
        FROM department_costs 
        WHERE year = 2025
        '''
        df = pd.read_sql_query(query, self.conn)
        
        # Prepare data for anomaly detection
        X = df[['cost']].values
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        # Train isolation forest model
        model = IsolationForest(contamination=0.1, random_state=42)
        df['anomaly'] = model.fit_predict(X_scaled)
        df['anomaly'] = df['anomaly'].map({1: 0, -1: 1})  # 1 is anomaly, 0 is normal
        
        # Get anomalies
        anomalies = df[df['anomaly'] == 1].sort_values('cost', ascending=False)
        
        # Visualize department costs
        plt.figure(figsize=(12, 6))
        
        # Current vs Previous Month
        current_month = 'Jun'  # Assuming June is the current month
        
        current_query = f'''
        SELECT department, cost 
        FROM department_costs 
        WHERE year = 2025 AND month = '{current_month}'
        '''
        current_df = pd.read_sql_query(current_query, self.conn)
        
        prev_query = f'''
        SELECT department, cost 
        FROM department_costs 
        WHERE year = 2024 AND month = '{current_month}'
        '''
        prev_df = pd.read_sql_query(prev_query, self.conn)
        
        # Merge the dataframes
        merged_df = current_df.merge(prev_df, on='department', suffixes=('_current', '_prev'))
        
        # Plot
        departments = merged_df['department']
        current_costs = merged_df['cost_current']
        prev_costs = merged_df['cost_prev']
        
        x = np.arange(len(departments))
        width = 0.35
        
        fig, ax = plt.subplots(figsize=(12, 6))
        rects1 = ax.bar(x - width/2, current_costs, width, label='Current Month', color='rgba(30, 58, 138, 0.8)')
        rects2 = ax.bar(x + width/2, prev_costs, width, label='Previous Month', color='rgba(30, 58, 138, 0.2)')
        
        ax.set_title('Department Costs Comparison')
        ax.set_xlabel('Department')
        ax.set_ylabel('Cost ($)')
        ax.set_xticks(x)
        ax.set_xticklabels(departments)
        ax.legend()
        
        plt.tight_layout()
        plt.savefig('static/visualizations/department_costs.png')
        
        # Create a visualization for anomalies
        if not anomalies.empty:
            plt.figure(figsize=(12, 6))
            sns.barplot(x='department', y='cost', data=anomalies, palette='Reds_r')
            plt.title('Cost Anomalies Detected')
            plt.xlabel('Department')
            plt.ylabel('Cost ($)')
            plt.xticks(rotation=45)
            plt.tight_layout()
            plt.savefig('static/visualizations/cost_anomalies.png')
        
        return {
            'anomalies': anomalies[['department', 'month', 'cost']].to_dict('records'),
            'visualizations': ['department_costs.png', 'cost_anomalies.png']
        }
    
    def feedback_analysis(self):
        """Analyze feedback sentiment and extract key topics"""
        # Get feedback data
        query = '''
        SELECT f.rating, f.comment, f.sentiment, d.name as driver_name
        FROM feedback f
        JOIN trips t ON f.trip_id = t.trip_id
        JOIN drivers d ON t.driver_id = d.driver_id
        '''
        df = pd.read_sql_query(query, self.conn)
        
        # Sentiment distribution
        sentiment_counts = df['sentiment'].value_counts().reset_index()
        sentiment_counts.columns = ['sentiment', 'count']
        
        # Rating distribution
        rating_counts = df['rating'].value_counts().sort_index().reset_index()
        rating_counts.columns = ['rating', 'count']
        
        # Topic modeling on comments
        # Filter out rows with no comments
        comments_df = df[df['comment'].notna()]
        
        # Preprocess comments
        stop_words = set(stopwords.words('english'))
        
        def preprocess_text(text):
            tokens = word_tokenize(text.lower())
            filtered_tokens = [w for w in tokens if w.isalpha() and w not in stop_words]
            return ' '.join(filtered_tokens)
        
        comments_df['processed_comment'] = comments_df['comment'].apply(preprocess_text)
        
        # Create document-term matrix
        vectorizer = CountVectorizer(max_df=0.95, min_df=2, max_features=1000)
        dtm = vectorizer.fit_transform(comments_df['processed_comment'])
        
        # Apply LDA
        lda = LatentDirichletAllocation(n_components=3, random_state=42)
        lda.fit(dtm)
        
        # Get top words for each topic
        feature_names = vectorizer.get_feature_names_out()
        topics = []
        
        for topic_idx, topic in enumerate(lda.components_):
            top_words_idx = topic.argsort()[:-11:-1]
            top_words = [feature_names[i] for i in top_words_idx]
            topics.append({
                'topic': f'Topic {topic_idx + 1}',
                'words': top_words
            })
        
        # Visualize sentiment distribution
        plt.figure(figsize=(10, 6))
        colors = {'positive': '#4CAF50', 'neutral': '#FFC107', 'negative': '#F44336'}
        sns.barplot(x='sentiment', y='count', data=sentiment_counts, palette=colors)
        plt.title('Feedback Sentiment Distribution')
        plt.xlabel('Sentiment')
        plt.ylabel('Count')
        plt.tight_layout()
        plt.savefig('static/visualizations/sentiment_distribution.png')
        
        # Visualize rating distribution
        plt.figure(figsize=(10, 6))
        sns.barplot(x='rating', y='count', data=rating_counts, color='#6366F1')
        plt.title('Driver Rating Distribution')
        plt.xlabel('Rating')
        plt.ylabel('Count')
        plt.tight_layout()
        plt.savefig('static/visualizations/rating_distribution.png')
        
        # Create a pie chart for sentiment distribution
        plt.figure(figsize=(8, 8))
        plt.pie(sentiment_counts['count'], labels=sentiment_counts['sentiment'], autopct='%1.1f%%', 
                colors=[colors.get(s, '#999999') for s in sentiment_counts['sentiment']])
        plt.title('Feedback Sentiment Distribution')
        plt.savefig('static/visualizations/sentiment_pie.png')
        
        return {
            'sentiment_distribution': sentiment_counts.to_dict('records'),
            'rating_distribution': rating_counts.to_dict('records'),
            'topics': topics,
            'visualizations': ['sentiment_distribution.png', 'rating_distribution.png', 'sentiment_pie.png']
        }
    
    def usage_pattern_analysis(self):
        """Analyze usage patterns and predict future demand"""
        # Get trip data
        query = '''
        SELECT 
            strftime('%w', start_time) as day_of_week,
            strftime('%H', start_time) as hour_of_day,
            pickup_location,
            destination,
            status,
            cost
        FROM trips
        WHERE status = 'completed'
        '''
        df = pd.read_sql_query(query, self.conn)
        
        # Convert day_of_week to string representation
        day_mapping = {
            '0': 'Sun', '1': 'Mon', '2': 'Tue', '3': 'Wed', 
            '4': 'Thu', '5': 'Fri', '6': 'Sat'
        }
        df['day_of_week'] = df['day_of_week'].map(day_mapping)
        
        # Group by day and hour
        hourly_usage = df.groupby(['day_of_week', 'hour_of_day']).size().reset_index(name='trips')
        
        # Convert hour to int for better visualization
        hourly_usage['hour_of_day'] = hourly_usage['hour_of_day'].astype(int)
        
        # Filter for business hours (6-22)
        business_hours = hourly_usage[hourly_usage['hour_of_day'].between(6, 22)]
        
        # Pivot for heatmap
        pivot_data = business_hours.pivot(index='hour_of_day', columns='day_of_week', values='trips')
        
        # Reorder days
        days_order = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        pivot_data = pivot_data.reindex(columns=days_order)
        
        # Route analysis
        route_counts = df.groupby(['pickup_location', 'destination']).size().reset_index(name='count')
        route_counts = route_counts.sort_values('count', ascending=False)
        
        # Visualize hourly usage patterns
        plt.figure(figsize=(12, 8))
        sns.heatmap(pivot_data, cmap='YlGnBu', annot=True, fmt='g')
        plt.title('Trip Distribution by Day and Hour')
        plt.xlabel('Day of Week')
        plt.ylabel('Hour of Day')
        plt.tight_layout()
        plt.savefig('static/visualizations/hourly_usage.png')
        
        # Visualize top routes
        top_routes = route_counts.head(10)
        plt.figure(figsize=(12, 6))
        sns.barplot(x='count', y=top_routes['pickup_location'] + ' → ' + top_routes['destination'], data=top_routes)
        plt.title('Top 10 Routes')
        plt.xlabel('Number of Trips')
        plt.ylabel('Route')
        plt.tight_layout()
        plt.savefig('static/visualizations/top_routes.png')
        
        # Get monthly usage data for prediction
        monthly_query = '''
        SELECT month, SUM(trips) as total_trips
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
        monthly_df = pd.read_sql_query(monthly_query, self.conn)
        
        # Simple prediction model
        # Convert month to numeric for model
        month_to_num = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6}
        monthly_df['month_num'] = monthly_df['month'].map(month_to_num)
        
        # Train a simple model
        X = monthly_df[['month_num']].values
        y = monthly_df['total_trips'].values
        
        model = RandomForestRegressor(n_estimators=100, random_state=42)
        model.fit(X, y)
        
        # Predict next month
        next_month = 7  # July
        prediction = model.predict([[next_month]])[0]
        
        # Visualize monthly trends with prediction
        plt.figure(figsize=(12, 6))
        sns.lineplot(x='month', y='total_trips', data=monthly_df, marker='o')
        
        # Add prediction point
        plt.plot('Jul', prediction, 'ro', markersize=10)
        plt.annotate(f'Prediction: {int(prediction)}', 
                    xy=('Jul', prediction), 
                    xytext=(0.85, 0.5), 
                    textcoords='axes fraction',
                    arrowprops=dict(facecolor='red', shrink=0.05))
        
        plt.title('Monthly Usage Trends with Prediction')
        plt.xlabel('Month')
        plt.ylabel('Total Trips')
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.tight_layout()
        plt.savefig('static/visualizations/monthly_prediction.png')
        
        return {
            'peak_usage': {
                'day': hourly_usage.sort_values('trips', ascending=False)['day_of_week'].iloc[0],
                'hour': int(hourly_usage.sort_values('trips', ascending=False)['hour_of_day'].iloc[0])
            },
            'top_routes': route_counts.head(5).to_dict('records'),
            'next_month_prediction': int(prediction),
            'visualizations': ['hourly_usage.png', 'top_routes.png', 'monthly_prediction.png']
        }
    
    def driver_performance_analysis(self):
        """Analyze driver performance based on ratings and feedback"""
        query = '''
        SELECT 
            d.driver_id,
            d.name,
            AVG(f.rating) as avg_rating,
            COUNT(f.feedback_id) as feedback_count,
            COUNT(CASE WHEN f.sentiment = 'positive' THEN 1 END) as positive_count,
            COUNT(CASE WHEN f.sentiment = 'negative' THEN 1 END) as negative_count,
            COUNT(t.trip_id) as trip_count,
            AVG(t.cost) as avg_trip_cost
        FROM 
            drivers d
        LEFT JOIN 
            trips t ON d.driver_id = t.driver_id
        LEFT JOIN 
            feedback f ON t.trip_id = f.trip_id
        GROUP BY 
            d.driver_id, d.name
        HAVING 
            feedback_count > 0
        '''
        df = pd.read_sql_query(query, self.conn)
        
        # Calculate positive feedback percentage
        df['positive_percentage'] = (df['positive_count'] / df['feedback_count']) * 100
        
        # Cluster drivers based on performance
        X = df[['avg_rating', 'positive_percentage', 'trip_count']].values
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        # Apply KMeans clustering
        kmeans = KMeans(n_clusters=3, random_state=42)
        df['cluster'] = kmeans.fit_predict(X_scaled)
        
        # Map clusters to performance categories
        cluster_centers = kmeans.cluster_centers_
        # Determine which cluster has highest average rating
        avg_rating_idx = 0
        cluster_avg_ratings = [center[avg_rating_idx] for center in cluster_centers]
        
        # Map clusters to performance levels
        performance_mapping = {}
        sorted_clusters = sorted(range(len(cluster_avg_ratings)), key=lambda i: cluster_avg_ratings[i])
        performance_mapping[sorted_clusters[0]] = 'Needs Improvement'
        performance_mapping[sorted_clusters[1]] = 'Average'
        performance_mapping[sorted_clusters[2]] = 'Top Performer'
        
        df['performance_category'] = df['cluster'].map(performance_mapping)
        
        # Visualize driver ratings
        plt.figure(figsize=(12, 6))
        sns.barplot(x='name', y='avg_rating', data=df.sort_values('avg_rating', ascending=False), 
                   hue='performance_category', palette={'Top Performer': '#4CAF50', 'Average': '#FFC107', 'Needs Improvement': '#F44336'})
        plt.title('Driver Performance by Average Rating')
        plt.xlabel('Driver')
        plt.ylabel('Average Rating')
        plt.xticks(rotation=45, ha='right')
        plt.legend(title='Performance Category')
        plt.tight_layout()
        plt.savefig('static/visualizations/driver_ratings.png')
        
        # Visualize driver trip counts vs ratings
        plt.figure(figsize=(10, 8))
        scatter = sns.scatterplot(x='trip_count', y='avg_rating', size='feedback_count', 
                                 hue='performance_category', data=df,
                                 palette={'Top Performer': '#4CAF50', 'Average': '#FFC107', 'Needs Improvement': '#F44336'},
                                 sizes=(50, 400))
        
        # Add driver names as annotations
        for i, row in df.iterrows():
            plt.annotate(row['name'], (row['trip_count'], row['avg_rating']), 
                        fontsize=8, alpha=0.8)
        
        plt.title('Driver Performance Matrix')
        plt.xlabel('Number of Trips')
        plt.ylabel('Average Rating')
        plt.grid(True, linestyle='--', alpha=0.3)
        plt.tight_layout()
        plt.savefig('static/visualizations/driver_performance_matrix.png')
        
        return {
            'driver_performance': df[['name', 'avg_rating', 'feedback_count', 'positive_percentage', 'trip_count', 'performance_category']].to_dict('records'),
            'top_performers': df[df['performance_category'] == 'Top Performer']['name'].tolist(),
            'needs_improvement': df[df['performance_category'] == 'Needs Improvement']['name'].tolist(),
            'visualizations': ['driver_ratings.png', 'driver_performance_matrix.png']
        }
    
    def run_all_analyses(self):
        """Run all analyses and return comprehensive results"""
        results = {
            'cost_analysis': self.cost_analysis(),
            'feedback_analysis': self.feedback_analysis(),
            'usage_patterns': self.usage_pattern_analysis(),
            'driver_performance': self.driver_performance_analysis()
        }
        
        return results
