import sqlite3
from datetime import datetime
from typing import List, Dict

DATABASE = "ratings.db"

# Create database and table
def create_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ratings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time TEXT,
            user TEXT,
            bot_name TEXT,
            conversation TEXT,
            rating INTEGER
        )
    ''')
    conn.commit()
    conn.close()

# Save rating into the database (Create)
def save_rating(rating_data):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO ratings (time, user, bot_name, conversation, rating)
        VALUES (?, ?, ?, ?, ?)
    ''', (datetime.now().isoformat(), rating_data.user, rating_data.bot_name, str(rating_data.conversation), rating_data.rating))
    conn.commit()
    conn.close()
    return True

# Retrieve ratings for a specific bot (Read)
def get_ratings(bot_name: str) -> List[Dict]:
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        SELECT time, user, bot_name, conversation, rating FROM ratings WHERE bot_name = ?
    ''', (bot_name,))
    rows = cursor.fetchall()
    conn.close()
    return [{"time": row[0], "user": row[1], "bot_name": row[2], "conversation": row[3], "rating": row[4]} for row in rows]

# Get rating by ID (specified record)
def get_rating_by_id(record_id: int) -> Dict:
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        SELECT time, user, bot_name, conversation, rating FROM ratings WHERE id = ?
    ''', (record_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return {"time": row[0], "user": row[1], "bot_name": row[2], "conversation": row[3], "rating": row[4]}
    return None

# Update rating by ID (Update)
def update_rating(record_id: int, new_rating: int, new_conversation: str) -> bool:
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE ratings
        SET rating = ?, conversation = ?
        WHERE id = ?
    ''', (new_rating, new_conversation, record_id))
    conn.commit()
    conn.close()
    return cursor.rowcount > 0

# Delete rating by ID (Delete)
def delete_rating(record_id: int) -> bool:
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        DELETE FROM ratings WHERE id = ?
    ''', (record_id,))
    conn.commit()
    conn.close()
    return cursor.rowcount > 0

# Extract records with specific filters (e.g., rating or time range)
def get_filtered_ratings(rating: int = None, start_time: str = None, end_time: str = None) -> List[Dict]:
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    query = 'SELECT time, user, bot_name, conversation, rating FROM ratings WHERE 1=1'
    params = []

    if rating:
        query += ' AND rating = ?'
        params.append(rating)
    if start_time:
        query += ' AND time >= ?'
        params.append(start_time)
    if end_time:
        query += ' AND time <= ?'
        params.append(end_time)

    cursor.execute(query, tuple(params))
    rows = cursor.fetchall()
    conn.close()
    return [{"time": row[0], "user": row[1], "bot_name": row[2], "conversation": row[3], "rating": row[4]} for row in rows]
