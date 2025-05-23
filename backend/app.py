from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database="karachi_trading",
        user="postgres",
        password=os.getenv("DB_PASSWORD")
    )

@app.route("/")
def home():
    return "Karachi Trading Co API is working!"

@app.route("/inventory", methods=["GET", "POST"])
def inventory():
    if request.method == "POST":
        data = request.get_json()
        name = data.get("name")
        quantity = data.get("quantity")

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO inventory (name, quantity) VALUES (%s, %s)", (name, quantity))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Inventory item added!"}), 201

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM inventory;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify([{"id": r[0], "name": r[1], "quantity": r[2]} for r in rows])

@app.route("/orders", methods=["GET", "POST"])
def orders():
    if request.method == "POST":
        data = request.get_json()
        product_name = data.get("product_name")
        status = data.get("status")

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO orders (product_name, status) VALUES (%s, %s)", (product_name, status))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Order added!"}), 201

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM orders;")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify([{"id": r[0], "product_name": r[1], "status": r[2]} for r in rows])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)