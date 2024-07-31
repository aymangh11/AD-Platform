from flask import Flask, request, jsonify
import psycopg2
import os

app = Flask(__name__)

# Database connection
def get_db_connection():
    conn = psycopg2.connect(
        dbname=os.environ.get('DB_NAME'),
        user=os.environ.get('DB_USER'),
        password=os.environ.get('DB_PASSWORD'),
        host=os.environ.get('DB_HOST')
    )
    return conn

@app.route('/update_flag', methods=['POST'])
def update_flag():
    data = request.json
    flag = data.get('flag')
    team_id = data.get('team_id')
    service_id = data.get('service_id')

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('INSERT INTO flags (flag, team_id, service_id) VALUES (%s, %s, %s)', (flag, team_id, service_id))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Flag updated successfully"}), 200

@app.route('/score', methods=['GET'])
def get_score():
    team_id = request.args.get('team_id')

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT score FROM scores WHERE team_id = %s', (team_id,))
    score = cur.fetchone()
    cur.close()
    conn.close()
    
    if score:
        return jsonify({"team_id": team_id, "score": score[0]}), 200
    else:
        return jsonify({"error": "Team not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
