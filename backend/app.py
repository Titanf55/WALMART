from flask import Flask, jsonify, request
import pandas as pd
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Load dataset
df = pd.read_csv("grocery_df.csv")
for col in ['Date_Received', 'Expiration_Date', 'Discount_Date', 'Donation_Date']:
    df[col] = pd.to_datetime(df[col])

def get_status(row, today):
    if today < row['Discount_Date']:
        return 'Fresh'
    elif row['Discount_Date'] <= today < row['Donation_Date']:
        return 'Discount'
    elif row['Donation_Date'] <= today < row['Expiration_Date']:
        return 'Donation'
    else:
        return 'Expired'

def update_status(df, today):
    df['Status'] = df.apply(lambda row: get_status(row, today), axis=1)
    return df

def generate_tables(df):
    inventory_table = df[['Product_ID', 'Product_Name', 'Catagory', 'Supplier_ID', 'Supplier_Name',
                          'Stock_Quantity', 'Reorder_Level', 'Reorder_Quantity', 'Unit_Price',
                          'Date_Received', 'Expiration_Date', 'Discount_Date', 'Donation_Date',
                          'Shelf_Life_(Days)', 'Shelf_Life_(Years)', 'Shelf_Life_Bin', 'Status']]
    fresh_table = inventory_table[df['Status'] == 'Fresh']
    discount_table = inventory_table[df['Status'] == 'Discount']
    donation_table = inventory_table[df['Status'] == 'Donation']
    expired_table = inventory_table[df['Status'] == 'Expired']
    return inventory_table, fresh_table, discount_table, donation_table, expired_table

def refresh_all_tables(current_date):
    global df, inventory_table, fresh_table, discount_table, donation_table, expired_table
    df = update_status(df, pd.Timestamp(current_date))
    inventory_table, fresh_table, discount_table, donation_table, expired_table = generate_tables(df)

refresh_all_tables(datetime.today())

@app.route('/inventory', methods=['GET'])
def get_inventory():
    return jsonify(inventory_table.to_dict(orient='records'))

@app.route('/fresh', methods=['GET'])
def get_fresh():
    return jsonify(fresh_table.to_dict(orient='records'))

@app.route('/discount', methods=['GET'])
def get_discount():
    return jsonify(discount_table.to_dict(orient='records'))

@app.route('/donation', methods=['GET'])
def get_donation():
    return jsonify(donation_table.to_dict(orient='records'))

@app.route('/expired', methods=['GET'])
def get_expired():
    return jsonify(expired_table.to_dict(orient='records'))

@app.route('/refresh', methods=['POST'])
def refresh_data():
    req = request.json
    date_str = req.get('date', datetime.today().strftime('%Y-%m-%d'))
    refresh_all_tables(date_str)
    return jsonify({"message": f"Data refreshed for {date_str}"}), 200

@app.route('/add-item', methods=['POST'])
def add_item():
    global df
    data = request.json
    for date_field in ['Date_Received', 'Expiration_Date', 'Discount_Date', 'Donation_Date']:
        data[date_field] = pd.to_datetime(data[date_field])
    new_row = pd.DataFrame([data])
    df = pd.concat([df, new_row], ignore_index=True)
    refresh_all_tables(datetime.today())
    return jsonify({"message": "Item added successfully"}), 201

if __name__ == '__main__':
    app.run(debug=True)
